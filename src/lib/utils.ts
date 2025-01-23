import axios, { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { backendUrl } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const redirectToLogin = () => {
  window.open(`${backendUrl}/api/auth/login/google?redirect=${location.origin}`, '_blank');
};

export const extractErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error;
  if (error instanceof AxiosError) {
    return error.response?.data.message || error.message;
  } else if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error occurred!';
};

export const wait = async (delay = 1000) => new Promise((res) => setTimeout(res, delay));

export const isShallowEqual = (
  objA: Record<string | number, unknown>,
  objB: Record<string | number, unknown>
): boolean => {
  if (objA === objB) return true;
  const keys = [...new Set([...Object.keys(objA), ...Object.keys(objB)])];
  const isEqual = keys.every((key) => objA[key] === objB[key]);
  return isEqual;
};

export const imageToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', (event) => {
      const result = event.target?.result?.toString();
      resolve(result || '');
    });
  });
};

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      formData
    );
    return data.data.display_url;
  } catch (error) {
    const message = `Could not upload image! ${error instanceof Error ? error.message : ''}`;
    throw new Error(message);
  }
};

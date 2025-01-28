import Link from 'next/link';

export default function Button({
  variant,
  link,
  onClick,
  text
}: {
  variant: string;
  link: string;
  onClick: () => void;
  text: string;
}) {
  return (
    <div>
      {variant === 'primary' && (
        <Link
          href={link}
          onClick={onClick}
          className="custom-transition hover:brightness-115 group relative mt-2 block w-fit cursor-pointer overflow-hidden bg-red-600 px-4 py-2 font-semibold text-white md:mt-4 lg:mt-6"
        >
          <span className="relative z-20">{text}</span>
          <span className="custom-transition absolute left-1/2 top-1/2 z-10 block size-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black opacity-0 group-hover:scale-[10] group-hover:opacity-100"></span>
        </Link>
      )}
    </div>
  );
}

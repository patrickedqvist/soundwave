import type { FC } from 'react';
import Image from 'next/image';
import cn from 'classnames';

interface Props {
  src: string;
  size: number;
  alt: string;
  className?: string;
}

const Avatar: FC<Props> = ({ src, alt, size, className }) => {
  return (
    <div
      className={cn('block h-6 w-6 rounded-full ring-2 ring-black overflow-hidden', className)}>
      <Image width={size} height={size} src={src} alt={alt} quality={90} />
    </div>
  );
};

export default Avatar;

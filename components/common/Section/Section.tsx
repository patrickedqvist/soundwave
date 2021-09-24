import cn from 'classnames';
import type { FC } from 'react';

interface Props {
    title: string;
    className?: string;
}

const Section: FC<Props> = ({ title, className, children }) => (
  <section className={cn('container mx-auto', className)}>
    <div className="mb-4">
      <h2 className="text-3xl font-bold">{title}</h2>
    </div>
    {children}
  </section>
);

export default Section;
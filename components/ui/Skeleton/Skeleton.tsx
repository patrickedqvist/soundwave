import { FC, CSSProperties } from 'react';
import cn from 'classnames';
import s from './Skeleton.module.scss';

interface BaseProps {
  className?: string;
  style?: CSSProperties;
}

interface RectangleProps extends BaseProps {
  aspectRatio: '16:9' | '4:3' | '1:1';
}

export const SkeletonText: FC<BaseProps> = ({ className, style }) => {
  const classes = cn(s.skeleton, s['skeleton--text'], className);
  return <div className={classes} style={style} aria-hidden='true' />;
};

export const SkeletonRectangle: FC<RectangleProps> = ({ className, style, aspectRatio = '1:1' }) => {
  const classes = cn(s.skeleton, s['skeleton--rect'], className, {
    [`${s['skeleton--rect-1:1']}`]: aspectRatio === '1:1',
    [`${s['skeleton--rect-4:3']}`]: aspectRatio === '4:3',
    [`${s['skeleton--rect-16:9']}`]: aspectRatio === '16:9',
  });
  return <div className={classes} style={style} aria-hidden='true' />;
};

export const SkeletonCircle: FC<BaseProps> = ({ className, style }) => {
  const classes = cn(s.skeleton, s['skeleton--circle'], className);
  return <div className={classes} style={style} aria-hidden='true' />;
};

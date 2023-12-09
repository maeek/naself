import classNames from 'classnames';
import './spacer.scss';

export interface SpacerProps {
  size?: 'small' | 'medium' | 'large';
  type?: 'horizontal' | 'vertical';
  className?: string;
}

export const Spacer = ({ size = 'medium', type = 'vertical', className }: SpacerProps) => {
  return (
    <div
      data-testid='spacer'
      className={classNames('spacer', `spacer--${size}`, `spacer--${type}`, className)}
    />
  );
};

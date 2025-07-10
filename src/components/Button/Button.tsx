import clsx from 'clsx';
import type { ButtonHTMLAttributes, FC } from 'react';

import styles from './Button.module.scss';

type ButtonVariant = 'edit' | 'save' | 'cancel' | 'link' | 'active';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: FC<ButtonProps> = ({ variant = 'save', className, children, type = 'button', ...rest }) => (
  <button
    type={type}
    className={clsx(
      styles[`${variant}Button`],
      className, // внешний класс, если надо
    )}
    {...rest}
  >
    {children}
  </button>
);

export default Button;

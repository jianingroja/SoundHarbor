'use client';

import classNames from 'classnames';
import Link from 'next/link';

type Props = {
  text: string;
  primary?: Boolean;
  secondary?: Boolean;
  warning?: Boolean;
  error?: Boolean;
  info?: Boolean;
  small?: Boolean;
  onClick?: Function;
  btnClasses?: string;
  link?: Boolean;
  href?: string;
  blank?: Boolean;
};

const Button = ({
  text,
  primary,
  secondary,
  warning,
  error,
  info,
  small,
  onClick,
  btnClasses,
  link,
  href,
  blank,
}: Props) => {
  const btnClassnames = classNames('btn', btnClasses, {
    'btn-primary': primary,
    'btn-secondary': secondary,
    'btn-warning': warning,
    'btn-error': error,
    'btn-info': info,
    'btn-sm': small,
  });

  if (link && href) {
    return (
      <Link href={href} target={blank ? '_blank' : ''}>
        <button className={btnClassnames}>{text}</button>
      </Link>
    );
  }

  const handleClick = () => {
    if (!onClick) {
      return null;
    }

    onClick();
    return;
  };

  return (
    <button onClick={handleClick} className={btnClassnames}>
      {text}
    </button>
  );
};
export default Button;

import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './ButtonLink.module.scss';
import { ThemeContext } from '../../../context/themeContext';

const cn = classNames.bind(styles);

type ButtonProps = {
  text: string;
  isDisabled?: boolean;
  onClick: (val: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonLink: FC<ButtonProps> = ({ text, isDisabled, onClick }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      className={cn('btn', {
        'btn--dt': theme === 'dark',
        'btn--lt': theme === 'light',
      })}
      type="button"
      disabled={isDisabled}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick(e)}
    >
      <span className={cn('btn__text')}>{text}</span>
    </button>
  );
};

export default ButtonLink;

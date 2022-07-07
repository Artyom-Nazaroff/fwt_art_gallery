import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './TextLink.module.scss';
import { ThemeContext } from '../../../context/themeContext';

const cn = classNames.bind(styles);

type LinkProps = {
  text: string;
  onClick?: (val: boolean) => void;
};

const TextLink: FC<LinkProps> = ({ text, onClick }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <span
      className={cn('link', {
        'link--dt': theme === 'dark',
        'link--lt': theme === 'light',
      })}
      role="presentation"
      onClick={() => onClick?.(false)}
    >
      {text}
    </span>
  );
};

export default TextLink;

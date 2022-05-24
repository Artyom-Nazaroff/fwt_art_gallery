import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './TextLink.module.scss';
import { ThemeContext } from '../../../context/themeContext';

const cn = classNames.bind(styles);

type LinkProps = {
  text: string;
};

const TextLink: FC<LinkProps> = ({ text }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={cn('link', {
        'link--dt': theme === 'dark',
        'link--lt': theme === 'light',
      })}
    >
      {text}
    </div>
  );
};

export default TextLink;

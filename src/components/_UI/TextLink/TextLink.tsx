import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './TextLink.module.scss';

const cn = classNames.bind(styles);

interface LinkProps {
  text: string;
}

const TextLink: FC<LinkProps> = ({ text }) => {
  return <div className={cn('link')}>{text}</div>;
};

export default TextLink;

import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './FooterIcons.module.scss';
import facebookDT from '../../assets/dark-theme/footer/fb.svg';
import facebookLT from '../../assets/light-theme/footer/fb.svg';
import vkDT from '../../assets/dark-theme/footer/vk.svg';
import vkLT from '../../assets/light-theme/footer/vk.svg';
import instDT from '../../assets/dark-theme/footer/inst.svg';
import instLT from '../../assets/light-theme/footer/inst.svg';
import { ThemeContext } from '../../context/themeContext';

const cn = classNames.bind(styles);

const FooterIcons = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={cn('icons')}>
      <a
        className={cn('icons__link')}
        href="https://www.facebook.com/framework.team"
        target="_blank"
        rel="noreferrer"
      >
        <img src={theme === 'dark' ? facebookDT : facebookLT} alt="Facebook" />
      </a>
      <a
        className={cn('icons__link')}
        href="https://vk.com/frameworkteam"
        target="_blank"
        rel="noreferrer"
      >
        <img src={theme === 'dark' ? vkDT : vkLT} alt="VK" />
      </a>
      <a
        className={cn('icons__link')}
        href="https://www.instagram.com/framework.team/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={theme === 'dark' ? instDT : instLT} alt="Instagram" />
      </a>
    </div>
  );
};

export default FooterIcons;

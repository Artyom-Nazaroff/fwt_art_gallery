import React from 'react';
import classNames from 'classnames/bind';
import styles from './FooterIcons.module.scss';
import darkFB from '../../assets/dark-theme/footer/fb.svg';
import darkVK from '../../assets/dark-theme/footer/vk.svg';
import darkInst from '../../assets/dark-theme/footer/inst.svg';

const cn = classNames.bind(styles);

const FooterIcons = () => {
  return (
    <div className={cn('icons')}>
      <a className={cn('icons__link')} href="https://www.facebook.com/framework.team">
        <img src={darkFB} alt="Facebook" />
      </a>
      <a className={cn('icons__link')} href="https://vk.com/frameworkteam">
        <img src={darkVK} alt="VK" />
      </a>
      <a className={cn('icons__link')} href="https://www.instagram.com/framework.team/ ">
        <img src={darkInst} alt="Instagram" />
      </a>
    </div>
  );
};

export default FooterIcons;

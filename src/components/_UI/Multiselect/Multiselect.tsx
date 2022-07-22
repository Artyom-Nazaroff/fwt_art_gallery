import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Multiselect.module.scss';
import arrowDownDT from '../../../assets/dark-theme/_UI/Multiselect/arrow-down.svg';
import arrowDownLT from '../../../assets/light-theme/_UI/Multiselect/arrow-down.svg';
import arrowUpDT from '../../../assets/dark-theme/_UI/Multiselect/arrow-up.svg';
import arrowUpLT from '../../../assets/light-theme/_UI/Multiselect/arrow-up.svg';
import Label from '../Label/Label';
import { ThemeContext } from '../../../context/themeContext';
import SelectItem from '../SelectItem/SelectItem';

const cn = classNames.bind(styles);

const Multiselect = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={cn('select', {
        'select--dt': theme === 'dark',
        'select--lt': theme === 'light',
        open: isOpened,
      })}
    >
      <div className={cn('select__label')}>Label</div>
      <div className={cn('select__inner')}>
        <div className={cn('select__input')}>
          <div className={cn('select__inputItems')}>LABELS ARE HERE</div>
          <button
            type="button"
            className={cn('select__inputArrow')}
            onClick={() => setIsOpened(!isOpened)}
          >
            {theme === 'dark' ? (
              <img src={isOpened ? arrowUpDT : arrowDownDT} alt="" />
            ) : (
              <img src={isOpened ? arrowUpLT : arrowDownLT} alt="" />
            )}
          </button>
        </div>
        <div className={cn('select__dropdown')}>
          <ul className={cn('select__list')}>
            <SelectItem title="Romanticism" id="romanticism" name="romanticism" />
            <SelectItem title="Art" id="art" name="art" />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Multiselect;

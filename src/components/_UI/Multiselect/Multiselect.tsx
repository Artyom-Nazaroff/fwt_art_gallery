import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Multiselect.module.scss';
import arrowDownDT from '../../../assets/dark-theme/_UI/Multiselect/arrow-down.svg';
import arrowUpDT from '../../../assets/dark-theme/_UI/Multiselect/arrow-up.svg';
import SelectItem from './SelectItem';
import Label from '../Label/Label';

const cn = classNames.bind(styles);

const Multiselect = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <div className={cn('select', 'select--dt', { open: isOpened })}>
      <div className={cn('select__label')}>Label</div>
      <div className={cn('select__inner')}>
        <div className={cn('select__input')}>
          <div className={cn('select__inputItems')}>
            <Label text="Romanticism" />
            <Label text="Romanticism" />
            <Label text="Romanticism" />
          </div>
          <button
            type="button"
            className={cn('select__inputArrow')}
            onClick={() => setIsOpened(!isOpened)}
          >
            <img src={isOpened ? arrowUpDT : arrowDownDT} alt="" />
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

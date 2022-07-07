import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Multiselect.module.scss';
import arrowDownDT from '../../../assets/dark-theme/_UI/Multiselect/arrow-down.svg';
import arrowDownLT from '../../../assets/light-theme/_UI/Multiselect/arrow-down.svg';
import arrowUpDT from '../../../assets/dark-theme/_UI/Multiselect/arrow-up.svg';
import arrowUpLT from '../../../assets/light-theme/_UI/Multiselect/arrow-up.svg';
import { ThemeContext } from '../../../context/themeContext';
import SelectItem from '../SelectItem/SelectItem';
import { Genre } from '../../../store/artists/artistsTypes';
import Label from '../Label/Label';

const cn = classNames.bind(styles);

type MultiselectProps = {
  label: string;
  genresList: Array<Genre>;
  artistsGenres: Array<Genre>;
  setArtistsGenres: (val: Array<Genre>) => void;
};

const Multiselect: FC<MultiselectProps> = ({
  label,
  genresList,
  artistsGenres,
  setArtistsGenres,
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const select = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = ({ target }: MouseEvent): void => {
      if (!select.current?.contains(target as Node)) setIsOpened(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const addGenre = (name: string, _id: string) => {
    setArtistsGenres([...artistsGenres, { name, _id }]);
  };

  const removeGenre = (_id: string) => {
    setArtistsGenres(artistsGenres.filter((i) => i._id !== _id));
  };

  return (
    <div
      className={cn('select', {
        'select--dt': theme === 'dark',
        'select--lt': theme === 'light',
        open: isOpened,
      })}
      ref={select}
    >
      <div className={cn('select__label')}>{label}</div>
      <div className={cn('select__inner')}>
        <div className={cn('select__input')}>
          <div className={cn('select__inputItems')}>
            {artistsGenres.map((item) => (
              <Label
                key={item._id}
                id={item._id}
                name={item.name}
                isRemove
                removeGenre={removeGenre}
              />
            ))}
          </div>
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
            {genresList.map((genre) => (
              <SelectItem
                key={genre._id}
                title={genre.name}
                id={genre._id}
                name={genre.name}
                addGenre={addGenre}
                removeGenre={removeGenre}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Multiselect;

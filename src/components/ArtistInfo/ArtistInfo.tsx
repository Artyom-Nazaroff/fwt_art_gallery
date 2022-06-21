import React, { FC, useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ArtistInfo.module.scss';
import '../../App.scss';
import linkArrowDownDT from '../../assets/dark-theme/artist-profile/link-arrow-down-dt.svg';
import linkArrowUpDT from '../../assets/dark-theme/artist-profile/link-arrow-up-dt.svg';
import linkArrowDownLT from '../../assets/light-theme/artist-profile/link-arrow-down-lt.svg';
import linkArrowUpLT from '../../assets/light-theme/artist-profile/link-arrow-up-lt.svg';
import noImageDT from '../../assets/dark-theme/artist-info/no-image-icon-dt.svg';
import noImageLT from '../../assets/light-theme/artist-info/no-image-icon-lt.svg';
import TextLink from '../_UI/TextLink/TextLink';
import Label from '../_UI/Label/Label';
import { ThemeContext } from '../../context/themeContext';
import '../../sass/breckpoints.scss';
import { Genre, Painting } from '../../store/artists/artistsTypes';

const cn = classNames.bind(styles);
const url = process.env.REACT_APP_BASE_URL;

type ArtistInfoProps = {
  name: string;
  years: string;
  place?: string;
  description: string;
  avatar?: Painting['image'];
  genres: Array<Genre>;
};

const ArtistInfo: FC<ArtistInfoProps> = ({ name, years, place, description, avatar, genres }) => {
  const [isFullText, setIsFullText] = useState<boolean>(false);

  const { theme } = useContext(ThemeContext);

  return (
    <section
      className={cn('artist', {
        'artist--dt': theme === 'dark',
        'artist--lt': theme === 'light',
      })}
    >
      <div className={cn('artist__container')}>
        {avatar ? (
          <picture className={cn('artist__portrait')}>
            <source srcSet={`${url}${avatar.webp}`} media="(min-width: 320px)" />
            <source srcSet={`${url}${avatar.src}`} media="(min-width: 320px)" />
            <source srcSet={`${url}${avatar.webp2x}`} media="(min-width: 768px)" />
            <source srcSet={`${url}${avatar.src2x}`} media="(min-width: 768px)" />
            <source srcSet={`${url}${avatar.original}`} media="(min-width: 1280px)" />
            <img src={`${url}${avatar.original}`} alt="portrait" />
          </picture>
        ) : (
          <div className={cn('artist__portrait')}>
            <img src={theme === 'dark' ? noImageDT : noImageLT} alt="" />
          </div>
        )}
        <div className={cn('artist__description')}>
          <div className={cn('artist__basicInfo')}>
            <div className={cn('artist__inner')}>
              <div className={cn('artist__dates')}>{years}</div>
              <div className={cn('artist__name')}>{name}</div>
            </div>
            <div className={cn('artist__place')}>{place}</div>
          </div>
          <div className={cn('artist__desktopName')}>{name}</div>
          <div className={cn('artist__otherInfo')}>
            <p
              className={cn('artist__text', {
                'artist__text--short': !isFullText,
                'artist__text--full': isFullText,
              })}
            >
              {description}
            </p>
            <button
              className={cn('artist__link')}
              type="button"
              onClick={() => setIsFullText(!isFullText)}
            >
              <TextLink text={isFullText ? 'Read less' : 'Read more'} />
              {!isFullText && (
                <img src={theme === 'dark' ? linkArrowDownDT : linkArrowDownLT} alt="" />
              )}
              {isFullText && <img src={theme === 'dark' ? linkArrowUpDT : linkArrowUpLT} alt="" />}
            </button>
            <div className={cn('artist__labels')}>
              {genres?.map((i) => (
                <Label key={i._id} id={i._id} name={i.name} isRemove={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistInfo;

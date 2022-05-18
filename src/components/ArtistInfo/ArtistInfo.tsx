import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './ArtistInfo.module.scss';
import '../../App.scss';
import artistPortrait from '../../assets/artist-profile/Aivazovsky.jpg';
import linkArrowDown from '../../assets/artist-profile/link-arrow-down-dark-theme.svg';
import TextLink from '../_UI/TextLink/TextLink';
import Label from '../_UI/Label/Label';

const cn = classNames.bind(styles);

// interface ArtistProps {
//   name: string;
//   years: string;
// }

const ArtistInfo: FC = () => {
  return (
    <section className={cn('artist')}>
      <div className={cn('artist__container')}>
        <div className={cn('artist__portrait')}>
          <img src={artistPortrait} alt="portrait" />
        </div>
        <div className={cn('artist__description')}>
          <div className={cn('artist__basicInfo')}>
            <div className={cn('artist__inner')}>
              <div className={cn('artist__dates')}>29 july 1817 – 2 may 1900</div>
              <div className={cn('artist__name')}>Ivan Aivazovsky</div>
            </div>
            <div className={cn('artist__place')}>Feodosia, Russian Empire</div>
          </div>
          <div className={cn('artist__desktopName')}>Ivan Aivazovsky</div>
          <div className={cn('artist__otherInfo')}>
            <p className={cn('artist__text')}>
              Ivan Konstantinovich Aivazovsky was a Russian Romantic painter who is considered one
              of the greatest masters of marine art. Baptized as Hovhannes Aivazian, he was born
              into an Armenian family in the Black Sea port of Feodosia in Crimea and was mostly
              based there... Following his education at the Imperial Academy of Arts in Saint
              Petersburg, Aivazovsky traveled to Europe and lived briefly in Italy in the early
              1840s. He then returned to Russia and was appointed the main painter of the Russian
              Navy. Aivazovsky had close ties with the military and political elite of the Russian
              Empire and often attended military maneuvers. He was sponsored by the state and was
              well-regarded during his lifetime. The saying "worthy of Aivazovsky's brush",
              popularized by Anton Chekhov, was used in Russia for describing something lovely. He
              remains highly popular in Russia in the 21st century. One of the most prominent
              Russian artists of his time, Aivazovsky was also popular outside Russian Empire. He
              held numerous solo exhibitions in Europe and the United States. During his almost
              60-year career, he created around 6,000 paintings, making him one of the most prolific
              artists of his time. The vast majority of his works are seascapes, but he often
              depicted battle scenes, Armenian themes, and portraiture. Most of Aivazovsky's works
              are kept in Russian, Ukrainian and Armenian museums as well as private collections.
            </p>
            <div className={cn('artist__link')}>
              <TextLink text="Read more" />
              <img src={linkArrowDown} alt="" />
            </div>
            <div className={cn('artist__labels')}>
              <Label text="Romanticism" />
              <Label text="Art" />
              <Label text="Nature" />
              <Label text="Bataille" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistInfo;
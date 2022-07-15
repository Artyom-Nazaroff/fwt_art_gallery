import React, { FC, useContext } from 'react';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
// eslint-disable-next-line import/no-unresolved
// import 'swiper/css/bundle';
import cn from 'classnames';
import { ThemeContext } from '../../../context/themeContext';
// eslint-disable-next-line import/no-unresolved
import 'swiper/scss';
// eslint-disable-next-line import/no-unresolved
import 'swiper/scss/pagination';
// eslint-disable-next-line import/no-unresolved
import 'swiper/scss/navigation';
import './Slider.scss';
import cross from '../../../assets/dark-theme/_UI/Slider/cross.svg';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import ButtonEditDelete, { EditOrDeleteButton } from '../ButtonEditDeleteProfile/ButtonEditDelete';
import { DeleteArtistOrPainting } from '../../DeletePopup/DeletePopup';
import { useActions } from '../../../hooks/useActions';

type SliderProps = {
  paintingData: { id: string; index: number };
  setIsSliderVisible: (val: boolean) => void;
  setDeleteOpened?: (val: boolean) => void;
  setAddEditPaintingOpened?: (val: boolean) => void;
  setCurrentPaintingId?: (val: string) => void;
  setDeleteArtistOrPainting?: (val: DeleteArtistOrPainting) => void;
};

const Slider: FC<SliderProps> = ({
  paintingData,
  setIsSliderVisible,
  setDeleteOpened,
  setAddEditPaintingOpened,
  setDeleteArtistOrPainting,
  setCurrentPaintingId,
}) => {
  const { theme } = useContext(ThemeContext);
  const { artistProfile } = useTypedSelector((state) => state.artists);
  const { isAuth } = useTypedSelector((state) => state.authRegistration);
  const { editMainPainting } = useActions();

  return (
    <Swiper
      pagination={{
        type: 'fraction',
      }}
      navigation
      modules={[Pagination, Navigation]}
      onSlideChange={(swiper) => {
        if (swiper.isEnd) swiper.allowSlideNext = false;
        if (!swiper.isEnd) swiper.allowSlideNext = true;
        if (swiper.isBeginning) swiper.allowSlidePrev = false;
        if (!swiper.isBeginning) swiper.allowSlidePrev = true;
      }}
      onSwiper={(swiper) => swiper.slideTo(paintingData.index, 0, false)}
      className={cn('swiper', {
        'swiper--dt': theme === 'dark',
        'swiper--lt': theme === 'light',
      })}
    >
      {artistProfile.paintings.map((item) => (
        <SwiperSlide key={item._id}>
          <img src={`https://internship-front.framework.team${item.image.src}`} alt="" />
          <div className={cn('swiper__topRow')} slot="container-start">
            <button
              className={cn('swiper__btn', { 'swiper__btn--disabled': !isAuth })}
              type="button"
            >
              <span
                className={cn('swiper__btnText')}
                role="presentation"
                onClick={() => editMainPainting(artistProfile._id, paintingData.id)}
              >
                {item._id === artistProfile?.mainPainting?._id ? 'Remove' : 'Make'} the cover
              </span>
            </button>
            <button
              className={cn('swiper__btn')}
              type="button"
              onClick={() => setIsSliderVisible(false)}
            >
              <img src={cross} alt="" />
            </button>
          </div>
          <div className={cn('swiper__bottomRow')} slot="wrapper-end">
            <div className={cn('swiper__description')}>
              <div className={cn('swiper__info')}>
                <p className={cn('swiper__year')}>{item.yearOfCreation}</p>
                <p className={cn('swiper__name')}>{item.name}</p>
              </div>
              <div className={cn('swiper__bottomButtons')}>
                {isAuth && (
                  <>
                    <span className={cn('swiper__bottomBtn')}>
                      <ButtonEditDelete
                        variant={EditOrDeleteButton.edit}
                        transparent
                        onClick={() => setAddEditPaintingOpened?.(true)}
                      />
                    </span>
                    <ButtonEditDelete
                      variant={EditOrDeleteButton.delete}
                      transparent
                      onClick={() => {
                        setDeleteOpened?.(true);
                        setDeleteArtistOrPainting?.(DeleteArtistOrPainting.painting);
                        setCurrentPaintingId?.(item._id);
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;

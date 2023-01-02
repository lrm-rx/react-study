import React, { memo, useRef, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { getNewAlbumAction } from '../../store/actionCreators';

import { Carousel } from 'antd';
import HYThemeHeaderRCM from '@/components/theme-header-rcm';
import AlbumCover from '@/components/album-cover';
import { AlbumWrapper } from "./style";

const NewAlbum = memo(() => {
  const { newAlbums } = useSelector(state => ({
    newAlbums: state.getIn(["recommend", "newAlbums"])
  }), shallowEqual)

  const dispatch = useDispatch()
  const carouselRef = useRef();

  useEffect(() => {
    dispatch(getNewAlbumAction(10, 0))
  }, [dispatch])

  return (
    <AlbumWrapper>
      <HYThemeHeaderRCM title="新碟上架" />
      <div className="content">
        <div className="arrow arrow-left sprite_02"
          onClick={e => carouselRef.current.prev()}></div>
        <div className="album">
          <Carousel ref={carouselRef} dots={false}>
            {
              [0, 1].map(item => {
                return (
                  <div key={item} className="page">
                    {
                      newAlbums.slice(item * 5, (item + 1) * 5).map(item => {
                        return (
                          <AlbumCover key={item.id} info={item} />
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <div className="arrow arrow-right sprite_02"
          onClick={e => carouselRef.current.next()}></div>
      </div>
    </AlbumWrapper>
  )
})

export default NewAlbum
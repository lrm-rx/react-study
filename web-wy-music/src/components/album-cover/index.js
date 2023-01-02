import React, { memo } from 'react'
import { getSizeImage } from "@/utils/format-utils";

import { AlbumWrapper } from "./style";
const AlbumCover = memo((props) => {
  const { info, size = 100, width = 118, bgp = 570 } = props
  return (
    <AlbumWrapper size={size} width={width} bgp={bgp}>
      <div className="album-image">
        <img src={getSizeImage(info.picUrl, size)} alt="" />
        <a href="/abc" className="cover sprite_covor">{info.name}</a>
      </div>
      <div className="album-info">
        <div className="name">{info.name}</div>
        <div className="artist">{info.artist.name}</div>
      </div>
    </AlbumWrapper>
  )
})

export default AlbumCover
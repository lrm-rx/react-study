import React, { useEffect, useState } from 'react'
import useScrollPosition from '../hooks/scroll-positioin-hook'

export default function CustomScrollPositionHook() {
  const position = useScrollPosition();
  return (
    <div style={{ height: "10000px", backgroundColor: "pink" }}>
      <h2 style={{ position: "fixed", left: 0, top: 0 }}>CustomScrollPositionHook: {position}</h2>
    </div>
  )
}

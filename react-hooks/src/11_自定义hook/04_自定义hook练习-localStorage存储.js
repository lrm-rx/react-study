import React, { useState, useEffect } from 'react'
import useLocalStorage from '../hooks/local-store-hook'

export default function CustomDataStoreHook() {
  const [localStoreName, setLocalStoreName] = useLocalStorage("name")
  return (
    <div>
      <h2>CustomDataStoreHook: {localStoreName}</h2>
      <button onClick={e => setLocalStoreName("xiaohu")}>设置name</button>
    </div>
  )
}

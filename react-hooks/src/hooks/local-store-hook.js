import { useState, useEffect } from 'react'

function useLocalStorage(key) {
  const [localStoreName, setLocalStoreName] = useState(() => {
    const localStoreName = JSON.parse(window.localStorage.getItem(key));
    return localStoreName;
  })
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(localStoreName))
  }, [localStoreName])

  return [localStoreName, setLocalStoreName]
}

export default useLocalStorage;
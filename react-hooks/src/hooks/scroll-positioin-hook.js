import { useEffect, useState } from 'react'

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(parseInt(window.scrollY));
    }
    document.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return scrollPosition;
}

export default useScrollPosition;
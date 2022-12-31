import React, { useContext } from 'react'
import useUserContext from '../hooks/user-hook';


export default function CustomContextShareHook() {
  const [user, token] = useUserContext();

  console.log(user, token);
  return (
    <div>CustomContextShareHook</div>
  )
}

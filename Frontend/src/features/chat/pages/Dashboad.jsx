import React from 'react'
import {useSelector} from 'react-redux'
const Dashboad = () => {
  
    const {user} = useSelector(state =>state.auth);
    console.log(user);

  return (
    <div>Dashboad</div>
  )
}

export default Dashboad
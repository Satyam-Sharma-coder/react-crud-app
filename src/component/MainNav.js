import React from 'react'
import { Link, useNavigate } from 'react-router-dom';




const MainNav = () => {

  let navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/login');

  }
  return (
      <>
          <Link to='/category'>Category List</Link>
          <Link to='add-category'>Add new Category</Link>
      <br></br>
      <br />
      <p>Hello {localStorage.getItem('userName')}</p>
      <button onClick={logoutHandler}>Logout</button>
      </>
  )
}

export default MainNav
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loader.gif'

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError]= useState('');

    let navigate = useNavigate();

    const submitHandler = (event) => {
        setLoading(true);
        event.preventDefault();
        axios.post('https://mern-api-peach.vercel.app/user/login', {
            userName: userName,
            password: password
        }).then(res => {
            setLoading(false);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userName', res.data.userName);
            console.log(res.data);
            navigate('/category');
        }).catch(err => {
            setLoading(false);
            setHasError(true);
            setError(err.response.data.msg);
            console.log(err);
        })
    }


  return (
      <>
          {isLoading && <div>
              <img alt={'hello'}  style={{width:'150px'}} src={loader}/>
          </div>}
          {!isLoading  && <div>
          <h1>Login Account</h1>
          <form onSubmit={submitHandler}>
              <input type='text' placeholder='username' onChange={(e)=>setUserName(e.target.value)} />
              <br />
              <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)} />
              <br />
                <button type='submit'>Submit</button>
              
          </form>
          </div>}
          {hasError && <div>
              <p style={{color:'red'}}>Error:- {error}</p>
          </div>}
      </>
  )
}

export default Login
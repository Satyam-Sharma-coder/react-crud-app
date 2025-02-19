import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import loader from '../assets/loader.gif'

const Detail = () => {
  const [category, setCategory] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError]= useState('');
  let params = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get('https://mern-api-peach.vercel.app/category/'+params.id)
      .then(res => {
        setLoading(false);
        setHasError(false);
        console.log(res.data);
        setCategory(res.data.category);
      }).catch(err => {
        setHasError(true);
        setError(err.response.data.message);
        setLoading(false);
    })
  },[])
  return (
    <>
      {isLoading && <div>
              <img alt={'hello'}  style={{width:'150px'}} src={loader}/>
          </div>}
      {!isLoading && !hasError && <div>
        <img style={{ width: '450px' }} src={category.photo} alt={'likeimages'} />
        <h1>{category.name}</h1>
      </div>}
      {hasError && <div>
              <p style={{color:'red'}}>Error:- {error}</p>
          </div>}
      
    </>
  )
}

export default Detail
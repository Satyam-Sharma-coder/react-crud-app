import axios from 'axios';
import React, { useEffect, useState } from 'react'
import imageLogo from '../assets/Screenshot (312).png'
import loader from '../assets/loader.gif'
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const [category, setCategory] = useState('');
    const [selectedImage, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(imageLogo);
    const [isLoading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState('');
    
    let params = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get('https://mern-api-peach.vercel.app/category/'+params.id)
          .then(res => {
            setLoading(false);
            setHasError(false);
              console.log(res.data);
              setCategory(res.data.category.name);
            setImageUrl(res.data.category.photo);
          }).catch(err => {
            setHasError(true);
            setError(err.response.data.message);
            setLoading(false);
        })
      },[])

    const fileHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('name', category);
        formData.append('photo', selectedImage);

        axios.put('https://mern-api-peach.vercel.app/category/'+params.id, formData)
            .then(res => {
                setLoading(false);
                navigate('/category');
            }).catch(err => {
                setLoading(false);
                setHasError(true);
                setError(err.message);
        })
    }
  return (
      <>
          {isLoading && <div>
              <img alt={'hello'}  style={{width:'150px'}} src={loader}/>
          </div>}
          {!isLoading && <div>
              <h1>Add new category</h1>
              <form onSubmit={submitHandler}>
                  <input value={category} onChange={(e) => {
                      setCategory(e.target.value)
                  }} type='text' />
                  <input onChange={(e) => {
                      fileHandler(e);
                  }} type='file' /> 
                  <button type='submit'>Submit</button>
                  <br />
                  <img alt={'hello'} style={{width:'150px'}} src={imageUrl} />
              </form>
          </div>}
          {hasError && <div>
              <p style={{color:'red'}}>Error:- {error}</p>
          </div>}
    </>
  )
}

export default Update
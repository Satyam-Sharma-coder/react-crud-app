import axios from 'axios';
import React, { useState } from 'react'
import imageLogo from '../assets/Screenshot (312).png'
import loader from '../assets/loader.gif'
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {

    const [category, setCategory] = useState('');
    const [selectedImage, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(imageLogo);
    const [isLoading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError]= useState('');

    let navigate = useNavigate();

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

        axios.post('https://mern-api-peach.vercel.app/category', formData, {
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('token')
            }
        })
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
                  <input onChange={(e) => {
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

export default AddCategory
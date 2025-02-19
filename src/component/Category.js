import axios from 'axios';
import React, { useEffect, useState } from 'react'
import loader from '../assets/loader.gif'
import { useNavigate } from 'react-router-dom';


const Category = () => {

    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState('');
    let navigate = useNavigate();

    const getData = () => {
        axios.get('https://mern-api-peach.vercel.app/category', {
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('token')
            }
        })
            .then(res => {
                setLoading(false);
                setHasError(false);
                setCategoryList(res.data.category);
            
            }).catch(err => {
                console.log(err);
                setLoading(false);
                setHasError(true);
                setError(err.response.data.msg);
                console.log(err.response.data.message);
            
        })
    }
    
    const detailRoute = (id) => {
        navigate('/detail/' + id);
    }

    const editRoute = (id) => {
        navigate('/edit/' + id);
    }

    const deleteRoute = (id,imageLink) => {
        if (window.confirm('Are you sure ?')) {
            axios.delete('https://mern-api-peach.vercel.app/category?'+'id='+id+'&imageUrl='+imageLink)
                .then(res => {
                    getData();
                }).catch(err => {
                    console.log(err);
            })
        }
        else {
            
        }
    }

    useEffect(() => {
        setLoading(true);
        getData();
    },[])
  return (
      <>
          {isLoading && <div>
              <img alt={'hello'}  style={{width:'150px'}} src={loader}/>
          </div>}
          {!isLoading && !hasError && <div>
              <h1>Category List</h1>
              <table>
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>image</th>
                      </tr>
                  </thead>
                  <tbody>
                      {categoryList?.map(data => <Row key={data._id} deleteReq={deleteRoute} editReq={editRoute} detail={data} deatilReq={detailRoute} />)} 
                  </tbody>
              </table>
          </div>}
          {hasError && <div>
              <p style={{color:'red'}}>Error:- {error}</p>
          </div>}
    </>
  )
}

const Row = (props) => {
    return (
        <tr>
            <td>{props.detail.name}</td>
            <td><img alt={'data'} style={{ width: '150px' }} src={props.detail.photo} /></td>
            <td><button onClick={()=>{props.deatilReq(props.detail._id)}}>Detail</button></td>
            <td><button onClick={()=>{props.editReq(props.detail._id)}}>Edit</button></td>
            <td><button onClick={()=>{props.deleteReq(props.detail._id,props.detail.photo)}}>Delete</button></td>
        </tr>
    )
}
export default Category
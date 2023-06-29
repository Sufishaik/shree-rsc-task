import React, { useEffect, useState } from 'react'
import "../Details/DetailsStyle.css";
import { useParams } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Details() {
    const [show, setshow] = useState([])
    const { id } = useParams();
    useEffect(() => {
        const data = async () => {
            const resp = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
            console.log(resp.data)
            setshow(resp.data);
        }
        data()
    } ,[show,id])
  return (
    <div>
      
      <div className="container">
                <div className="details-left">
                    <div className="title"><h1>Title :
                        <h1 className='titledis'> {show.title}.</h1>
                        {/* {id < 101 ? <h1 className='body'>{show.title}</h1> : <h1 className='body'>{postData[(id % 10) - 1].title}</h1>} */}

                    </h1></div>


                    <div className="info">
                       
                        <div>
                            <span>BODY : </span>
                            <span className='body'>{show.body}</span>
                        </div>

                    </div>
                </div>
            </div>
            <div className='home'>

            <Link to="/">
                 <button className='btn btn-primary'>Back Home</button>
            </Link>

            </div>
    </div>
  )
}

export default Details

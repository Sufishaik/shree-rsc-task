import React, { useEffect, useState } from 'react'
import axios from "axios"
import "../Home/HomeStyle.css"
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
function Home() {
  const [show, setshow] = useState([]);

  const [sorting, setsorting] = useState('asc');

  const [sortBy, setsortBy] = useState(null);
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(10);
  const [search, setsearch] = useState('')
  const api = "https://jsonplaceholder.typicode.com/posts";
  const fetchAPI = async (url) => {
    const resp = await axios.get(url);
    
    setshow(resp.data);
  }
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const handleSorting = (column) => {
    if (sortBy === column) {
      setsorting(sorting === 'asc' ? 'desc' : 'asc');
    } else {
      setsortBy(column);
      setsorting('asc');
    }
  }
  const sortedData = show.slice().sort((a, b) => {
    if (a[sortBy] < b[sortBy]) {
      return sorting === 'asc' ? -1 : 1;
    }
    if (a[sortBy] > b[sortBy]) {
      return sorting === 'asc' ? 1 : -1;
    }
    return 0;
  })
  const currentPosts = sortedData.slice(firstPostIndex, lastPostIndex)
  const handleSearch = (e) => {
    setsearch(e.target.value);
  }
  const check1 = currentPosts.filter((i) => {
    if( i.title.toLowerCase().includes(search.toLowerCase())) {
      return i;
    }
    if( i.body.toLowerCase().includes(search.toLowerCase())) {
      return i;
    }
  })


  useEffect(() => {
    fetchAPI(api)
  }, [currentPage, check1])
  return (
    <>
 
      <div className=''>
        <input type="text" name="" id="" value={search} onChange={handleSearch} placeholder='Search' className='search' />
      </div>
      <div className="container" style={{ padding: "5rem" }}>
        <div className="card" style={{ padding: "2rem" }}>
          <div className="card-title">
            <h2 style={{ textAlign: "center", color: 'black' }} >
              Welcome to the React redux Contact Book
            </h2>
          </div>
          <div className="card-body col-md-30">
            <table className="table table-bordered" style={{ textAlign: 'center' }}>
              <thead className="bg-dark text-white">
                <tr>
                  <th onClick={() => handleSorting('id')}>ID {sorting ? <span>&uarr;</span> : <span>&darr;</span>} </th>
                  <th onClick={() => handleSorting('title')}>Title {sorting ? <span>&uarr;</span> : <span>&darr;</span>} </th>
                  <th onClick={() => handleSorting('body')}> Body {sorting ? <span>&uarr;</span> : <span>&darr;</span>}  </th>
                  <th onClick={() => handleSorting('userid')}>UserID {sorting ? <span>&uarr;</span> : <span>&darr;</span>} </th>

                </tr>
              </thead>
              <tbody>

                {
                  check1 ? check1.map((item) => {
                    return (
                      <>
                        <tr key={item.id}>
                          <td>{item.id}</td>

                          <Link to={`/details/${item.id}`}>

                            <td>{item.title.charAt(0).toUpperCase() + item.title.slice(1, 25)}...</td>

                          </Link>
                          <td>{item.body.charAt(0).toUpperCase() + item.body.slice(1, 25)}...</td>
                          <td className='userid'>{item.userId}</td>
                        </tr>
                      </>
                    )
                  })

                    :
                    currentPosts.map((item) => {
                      return (
                        <>
                          <tr key={item.id}>
                        <div className='wrap'>
                            <td>{item.id}</td>
                            <Link to={`/details/${item.id}`}>

                              <td className='link'>{item.title.charAt(0).toUpperCase() + item.title.slice(1, 25)}...</td>

                            </Link>
                            <td>{item.body.charAt(0).toUpperCase() + item.body.slice(1, 25)}...</td>
                            <td className='userid'>{item.userId}</td>
                        </div>
                          </tr>
                        </>
                      )
                    })
                }
              </tbody>

            </table>
            <Pagination totalPosts={show.length} setcurrentPage={setcurrentPage} postperpage={postPerPage}/>
            {/* <div className='pagination'>
              <img src={right} alt="" className='right' onClick={getPrevPage} />


              <div className='p' style={{ color: 'black' }} >{page} of {show.length}</div>
              <img src={left} alt="" className='left' onClick={getNextPage} />
            

            </div> */}
          </div>
        </div>
      </div>
     
    </>
  )
}

export default Home

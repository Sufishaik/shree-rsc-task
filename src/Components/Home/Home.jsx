import React, { useEffect, useState } from 'react'
import axios from "axios"
import "../Home/HomeStyle.css"
import { Link } from 'react-router-dom';
import left from "../../assets/Vector.svg"
import right from "../../assets/Vector (15).png"
function Home() {
  const [show, setshow] = useState([]);
  const [filterSearch, setfilterSearch] = useState([])
  const [sorting, setsorting] = useState('asc');
  const [page, setpage] = useState(1);
  const [sortBy, setsortBy] = useState(null);
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(10);
  const [search, setsearch] = useState('')
  const api = "https://jsonplaceholder.typicode.com/posts";
  const fetchAPI = async (url) => {
    const resp = await axios.get(url);
    // console.log(resp.data);
    // setdata()
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




  const getNextPage = () => {
    setpage(page + 1)
    setcurrentPage((next) => next + 1)
  }
  const getPrevPage = () => {
    setpage(page - 1)
    setcurrentPage((prev) => prev - 1)
  }
  const handleSearch = (e) => {
    setsearch(e.target.value);
  }
  const check = currentPosts.filter((i) => {
    return i.title.toLowerCase().includes(search.toLowerCase())
  })

  useEffect(() => {
    fetchAPI(api)
  }, [currentPage, check])
  return (
    <>
 <ul className="navbar-nav mb-2 mb-lg-0 sort">
              <li className="nav-item dropdown my-3">
                <a href="" className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Sort By
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                      
                    <h5  className="dropdown-item title" style={{cursor : 'pointer'}} onClick={() => handleSorting('title')}>
                      Title {sorting ? <span>&uarr;</span> : <span>&darr;</span>}
                    </h5>
                  </li>
                  <li>
                    <h5
                      className="dropdown-item body"
                      style={{cursor : 'pointer'}}
                      onClick={() => handleSorting('body')}
                    >
                      Body {sorting ? <span>&uarr;</span> : <span>&darr;</span>}
                    </h5>
                  </li>
                  
                </ul>
              </li>
              
              
            </ul>
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
                  <th >ID</th>
                  <th >Title  </th>
                  <th > Body  </th>
                  <th>UserID</th>

                </tr>
              </thead>
              <tbody>

                {
                  check ? check.map((item) => {
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
            <div className='pagination'>
              <img src={right} alt="" className='right' onClick={getPrevPage} />


              <div className='p' style={{ color: 'black' }} >{page} of {show.length}</div>
              <img src={left} alt="" className='left' onClick={getNextPage} />
            

            </div>
          </div>
        </div>
      </div>
     
    </>
  )
}

export default Home

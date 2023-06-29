import React from 'react'
import "../Pagination/PagiStyle.css";
function Pagination({ totalPosts, postperpage, setcurrentPage }) {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postperpage); i++) {
        pages.push(i);
    }
    return (
        <div className='pagi'>
            {
                pages.map((page, index) => {
                    return <button className='btn-pagi' onClick={() => setcurrentPage(page)} key={index}>{page}</button>
                })
            }
        </div>
    )
}

export default Pagination

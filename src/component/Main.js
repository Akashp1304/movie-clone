import React, { useEffect, useState } from 'react'
import { Card } from './Card'
import { Link } from 'react-router-dom';
let API_key='&api_key=965e217fda82f229cd29ec4ab2e8650b';
let base_url='https://api.themoviedb.org/3'
let url=base_url+'/discover/movie?sort_by=popularity.desc'+API_key;
let arr=["Popular","Kids","Drama","Comedies"]
export const Main = () => {
    const [movieData,setData]=useState([]);
    const [url_set,setUrl] = useState(url);
    useEffect(()=>{
fetch(url_set).then(res=>res.json()).then(data=>{
    // console.log(data.results)
    setData(data.results);
})
    },[url_set])
    const getData=(movieType)=>{
        // if(movieType=="Popular")
        // {
        //     url=base_url+'/discover/movie?sort_by=popularity.desc'+API_key;"/discover/movie?primary_release_date.get=2022-01-10&primary_release_date.lte=2022-07-30"
        // }
        if(movieType==="Popular")
        {
            url=base_url+'/discover/movie?sort_by=popularity.desc'+API_key;
        }
        if(movieType==="Kids")
        {
            url=base_url+"/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc"+API_key
        }
        if(movieType==="Drama")
        {
            url=base_url+"/discover/movie?with-genres=18&primary_release_year=2022"+API_key
        }
        if(movieType==="Comedies")
        {
            url=base_url+"/discover/movie?with-genres=35&with_cast=23659&sort_by=revenue.desc"+API_key
        }
        setUrl(url);
    }
  return (
    <>
    <div className='header'>
        <nav>
            <ul>
                {
                    arr.map((value)=>{
                        return(
                            <li><Link to='/' name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</Link></li>
                        )
                    })
                }
                
                {/* <li><a href='#'>Theatre</a></li>
                <li><a href='#'>Kids</a></li>
                <li><a href='#'>Drama</a></li>
                <li><a href='#'>Comedies</a></li> */}
            </ul>
        </nav>
        <form>
            <div className='search-btn'>
                <input type='text' placeholder='Enter Movie Name' className='inputText'> 
                </input>
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </form>

    </div>
    <div className='container'>
                {
                    (movieData.length===0)?<p className='notfound'>Not Found</p>: movieData.map((res,pos)=>{
                        return(
                            <Card  info={res} key={pos}/>
                        )
                    })
                }      

    </div>
    </>
  )
}

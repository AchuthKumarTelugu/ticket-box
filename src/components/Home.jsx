
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
export default function Home () {
    let [movies,setMovies]=useState([])
    let navigate=useNavigate()
    useEffect(()=>{
        let email=localStorage.getItem('userEmail')
        if(!email) {
              navigate('/login')
        }
    },[])
     useEffect(()=>{
        async function getData() {
            let movieData=await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=c49d68720978f410e5623716625cbe43")
            console.log(movieData.data.results)
            setMovies(movieData.data.results)
        }
        getData()
        
     },[])
    
     let handleMovieClick = (movie) => {
        navigate('/movieDetails',{state:movie})
     }
    return (
        <div style={{padding:'2rem'}}>
            <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>
                {movies.map((movie)=>{
                    return (
                        <Card  onClick={()=>handleMovieClick(movie)} style={{ width: '18rem',margin:'0.2rem' }} key={movie.id}>
                      <Card.Img variant="top"   src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} />
                        <Card.Body>
                          <Card.Title>{movie.title}</Card.Title>
                    
                        </Card.Body>
                      </Card>
                    )
                     
                })}
            </div>
            {/* <Outlet/> */}
        </div>
    )
}
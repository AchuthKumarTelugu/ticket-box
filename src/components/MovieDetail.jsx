
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MovieDetail() {
    let location=useLocation()
    let {original_title,overview,poster_path}=location.state
    let [latLng,setLatLng]=useState({}) //latitude,longitude
    let [theaters,setTheaters]=useState([])
    let [timings,setTimings]=useState(["9:00 AM","1:00 PM","4:00 PM","7:00 PM"])
    useEffect(()=>{
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position)=> {
                  setLatLng({
                    lat:position.coords.latitude,
                    lng:position.coords.longitude
                  })
            })
        }
    },[])
    
    useEffect(()=>{
        console.log(latLng)
        let geoApi
        if(Object.keys(latLng) > 0){
            geoApi=`https://api.geoapify.com/v2/places?categories=entertainment.cinema&filter=circle:${latLng.lng},${latLng.lat},5000&bias=proximity:78.44202,17.3707564&limit=20&apiKey=789ac54c8c2b44d2acbe792d2b7cf785`
        } else{
            geoApi=`https://api.geoapify.com/v2/places?categories=entertainment.cinema&filter=circle:78.44202,17.3707564,5000&bias=proximity:78.44202,17.3707564&limit=20&apiKey=789ac54c8c2b44d2acbe792d2b7cf785`
        }
        axios.get(geoApi).then((response)=>{
            console.log(response.data.features)
            let featuresArr=response.data.features
            let names=[]
            featuresArr.map((feature)=>{
                let name=feature.properties.name
                if(name) {
                    names.push(feature.properties.name)
                }
            })
            console.log(names)
            setTheaters(names)
        })

    },[latLng])
    let navigate=useNavigate()
    return (
        <div>
            <Row>
                <Col style={{ padding: '5rem' }}>

                    <div style={{display:'flex',flexDirection:'column'}}>
                       <img src={`http://image.tmdb.org/t/p/w185${poster_path}`} style={{width:'15rem'}}/>
                       <h3 style={{margin:'1.5rem 0'}}>{original_title}</h3>
                       <h6>{overview}</h6>
                    </div>

                </Col>
                <Col style={{ padding: '5rem' }}>
                    <div>
                    {
                    theaters.map((theater,index) => {
                        return (
                           <div key={index}>
                             <div style={{margin:'1rem 0',fontSize:'1.5rem',fontWeight:'bold'}}>{theater}</div>
                            {
                                timings.map((time,index)=>{
                                    return <Button onClick={()=>{
                                        navigate('/seatSelect',{state:{title:original_title}})
                                    }} key={index} style={{margin:'0 1rem'}}>{time}</Button>
                                })
                            }
                           </div>
                        )
                    })
                }
                    </div>
               
                </Col>
            </Row>
        </div>
    )
}
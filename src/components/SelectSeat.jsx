import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
export default function SelectSeat() {
    let location = useLocation()
    let { title } = location.state
    let [seatsMatrix, setSeatsMatrix] = useState([])
    let [selectedSeats, setSelectedSeats] = useState([])
    let navigate=useNavigate()
    let handleSeatClick = (newSeat) => {
        setSelectedSeats([...selectedSeats, newSeat])
    }
    let createSeats = () => {
        let totalRows = 5
        let noOfSeatsInRow = 8
        let row = 0
        let tempSeats = []
        let ch = 'A'
        while (row < totalRows) {
            let col = 1
            let tempArr = []
            while (col <= noOfSeatsInRow) {
                tempArr.push(ch + col)
                col++
            }
            tempSeats.push(tempArr)
            row++
            ch = String.fromCharCode(ch.charCodeAt(0) + 1)
        }
        // console.log(tempSeats)
        setSeatsMatrix(tempSeats)
    }
    useEffect(() => {
        createSeats()
    }, [])
    return (
        <div style={{ padding: '4rem' }}>
            <div>
                <h3 className='d-inline-block'>{title}</h3>
                <div style={{ marginLeft: '30rem' }} className='d-inline-block'> Screen this side</div>
                <div style={{fontWeight:'bold',color:'gray'}}>cost of each ticket : Rs.150</div>
            </div>
            <div style={{ marginTop: '4rem' }}>
                {
                    seatsMatrix.map((seatsArr, index) => {
                        return (
                            <Row key={index} style={{ marginBottom: '1rem' }} >
                                {
                                    seatsArr.map((seat, index) => {
                                        let isSelected=selectedSeats.indexOf(seat) > -1
                                        return <Col key={index} style={{}} >
                                            <Button style={{backgroundColor:isSelected ? 'green' :'white',border: '1px solid green',color:isSelected ? 'white':'black' }} onClick={() => handleSeatClick(seat)}>{seat}</Button>
                                        </Col>
                                    })
                                }
                            </Row>
                        )
                    })
                }
            </div>
            <div>
                {  selectedSeats.length > 0 ?  (
                    <div style={{marginTop:'3rem'}}> 
                        <h3 style={{marginBottom:'2rem'}}>Seats selected : {selectedSeats.length}</h3>
                        {selectedSeats.map((seat,index) => {
                        return (
                            <span style={{margin:'0 1rem',fontWeight:'bold'}} key={index} >
                              {seat}
                            </span>
                        )
                    })}
                    <h5 style={{margin:'1rem 0'}}> Total cost : Rs.{selectedSeats.length * 150}</h5>
                    <Button onClick={()=>navigate('/success')}>Checkout</Button>
                    </div>
                ) :  <div>No seats selected</div>

                    
                }
                    
                
            </div>
        </div>
    )
}

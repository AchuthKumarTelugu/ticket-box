
import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import cinemaSetup from '../assets/cinemaSetup.png'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
// import { Outlet } from "react-router-dom";
export default function Login({setUser}) {
    let [email,setEmail]=useState('')
    let navigate=useNavigate()
   let handleCta = () => {
    localStorage.setItem('userEmail',email)
    navigate('/')
    setUser(email)
   }
    return (
        <div className='auth-container'>
            <Container >
                <Row>
                    <Col className='image-container'>
                        <img src={cinemaSetup} alt="" style={{ width: '35rem' }} />
                    </Col>
                    <Col className='form-container'>
                        <Card  className='card'>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control value={email} onChange={(e)=>setEmail(e.currentTarget.value)} type="email" placeholder="Enter email" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
                                    
                                    <Button onClick={handleCta} variant="primary" type="submit" className='login-btn'>
                                        Login
                                    </Button>
                                </Form>
                                <div className='signupClick'>New here ? Please  <Link to='/signup'>Sign up</Link></div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            {/* <Outlet/> */}
        </div>
    )
}
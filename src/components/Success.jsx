
import React from "react";
import { Col, Row } from "react-bootstrap";
import scanner from '../assets/scanner1.png'
import popcorn from '../assets/popcorn.png'
export default function Success() {
    return (
        <div>
            <Row style={{ marginTop: '8rem' }}>
                <Col style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <img src={popcorn} style={{ width: '20rem' }} />
                        <h5 style={{marginTop:'1rem'}}>Tickets confirmed</h5>
                        <h6>Enjoy your movies</h6>
                    </div>

                </Col>
                <Col style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={scanner} style={{ height:'20rem' }} />
                </Col>
            </Row>
        </div>
    )
}

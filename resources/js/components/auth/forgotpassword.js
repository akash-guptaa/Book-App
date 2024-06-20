import { useState } from "react";
import { Routes, Route, Link, link, useNavigate, Navigate } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import LoadingSpinner from "../loader/loader"

import ForgotPasswordInput from "../profile/forgotpasswordinput"
import { Container } from "react-bootstrap";


export default function ForgotPasswordIndex() {


    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <div className="sectioninnerbox p-3">

                            <Row>
                                <Col xs={12}>
                                    <h4 className="sectionheader my-0">{"Reset Password"}</h4>
                                </Col>
                                <Col xs={12}><div className="graybottomborder my-2 mb-3"></div></Col>
                                <ForgotPasswordInput
                                    editoremail={true}
                                    typeofpassword={"Email Address"}
                                />
                            </Row>

                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams, select, useHistory } from "react-router-dom";

import { Route, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Alert, Accordion, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, CloseButton, Dropdown, DropdownButton, Figure, Image, ListGroup, Modal, Nav, Navbar, Offcanvas, Overlay, Pagination, Placeholder, Popover, ProgressBar, Spinner, Table, Tabs, Tooltip, Toast, } from "react-bootstrap";
import swal from 'sweetalert';
import LoadingSpinner from "../loader/loader";
import { headerPyalod } from '../utility/utility'


const LogoutIndex = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    sessionStorage.clear();
    const userLogout = ((investement_id) => {
        setIsLoading(true);
        const response = axios.post("/api/v1/logout", headerPyalod)
            .then((response) => {
                sessionStorage.clear();
                //setToken(null);
                //setUser(null);
                console.log("Session Loging out before Redirect");
                setIsLoading(false)
                navigate("/loginpage");

            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error);
            });
    });
    useEffect(() => {

        userLogout();

    }, [])
}
export default LogoutIndex

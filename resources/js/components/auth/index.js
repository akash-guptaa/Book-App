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

export default function LoginIndex() {
    const passportToken = sessionStorage.getItem("passportToken");
    console.log("passportToken", passportToken);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [passwordToggleActive, setActive] = useState(false);
    const passwordToggle = () => {
        setActive(!passwordToggleActive);
    };

    const getToken = () => {
        const tokenString = sessionStorage.getItem("token");
        const userToken = JSON.stringify(tokenString);
        return userToken;
    };

    const getUser = () => {
        const userString = sessionStorage.getItem("user");
        const user_detail = JSON.stringify(userString);
        return user_detail;
    };

    const [user, setUser] = useState(getUser());
    const [token, setToken] = useState(getToken());

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const showToastererror = (error) => {
        error && Object.keys(error).length > 0 && (
            Object.entries(error).map(([key, value]) => (
                value && value.map((data, index) => {
                    toast.error(data)
                })
            ))
        )
    }
    const [validated, setValidated] = useState(false);

    const submitLoginForm = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
        } else {
            e.preventDefault();
            const loginPayload = {
                email: email,
                password: password,
            }
            try {
                setIsLoading(true);
                const response = await axios.post(`/api/v1/loginuser`, loginPayload)
                    .then((response) => {
                        if (response?.status == 200) {
                            if (response?.data?.status == false) {
                                toast.error(response?.data?.error);
                            } else {

                                sessionStorage.setItem("token", JSON.stringify(response?.data?.access_token));
                                sessionStorage.setItem("user", JSON.stringify(response?.data?.user));
                                sessionStorage.setItem("passportToken", response?.data?.access_token);
                                sessionStorage.setItem("userroles", response?.data?.userroles);
                                localStorage.setItem("access-token-on-login-sign", JSON.stringify(response?.data?.access_token));
                                setToken(response?.data?.access_token);
                                setUser(response?.data?.user);
                                let userroles = JSON.stringify(response?.data?.userroles);
                                if (userroles.length != 0) {
                                    if (userroles.includes("Master Admin")) {
                                        console.log("Master Admin");
                                        navigate('/dashboard');
                                    }
                                    else if (userroles.includes("Super Admin")) {
                                        console.log("Super Admin");
                                        navigate('/dashboard');
                                    }
                                    else {
                                        console.log("User Roles", userroles);
                                        navigate('/dashboard');
                                    }
                                }
                                else {

                                }
                            }
                            setIsLoading(false)
                        }
                    })
                    .catch((error) => {

                        if (error.response) {

                            setIsLoading(false)
                        } else if (error.request) {

                            console.log(error.request);
                            setIsLoading(false)
                        } else {

                            console.log('Error', error.message);
                            setIsLoading(false)
                        }
                    });
            } catch (err) {
                toast.error('Unauthorized User');
                setIsLoading(false)
            }
            setValidated(false);
        }

    };
    if (isLoading) { return <LoadingSpinner />; }
    if (passportToken) {
        return <Navigate replace to="/dashboard" />;
    } else {
        return (
            <Form noValidate validated={validated} onSubmit={submitLoginForm}>

                <div className="justify-content-center">
                    <div className="loginbox pt-5">
                        <div className="login-card card">
                            <img src="../../img/clogo/logo.svg" alt="Logo" className="companylogo" />
                            <h1 className="mb-2 loginheader">Login to <span>BookApp Management Software</span> </h1>
                            <p className="logindesc">Please enter your login credentials here</p>

                            <Form.Group className="mb-3 logininput" >
                                <Form.Control required type="email" placeholder="Enter valid email address" onChange={(e) => setEmail(e.target.value)} id="email" />
                                <i className="inputicon fa-solid fa-at"></i>

                                <Form.Control.Feedback type="invalid">
                                    Please enter valid email address
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="logininput">
                                <Form.Control required type={passwordToggleActive ? "text" : "password"} maxLength="15" className="form-control" placeholder="Password (10+ characters)" onChange={(e) => setPassword(e.target.value)} id="pwd" />
                                <i className="inputicon fa-solid fa-lock"></i>
                                <Button className={passwordToggleActive ? "passwordtogglebtn textviewicon" : "passwordtogglebtn passwordviewicon"} onClick={passwordToggle}></Button>
                                <Form.Control.Feedback type="invalid">
                                    Please enter valid password
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="text-end">
                                <Button variant="link" as={Link} to={"/forgotpassword"} className="mt-3 p-0">Forgot Password</Button>
                            </Form.Group>
                            {/* <button type="button"  className="btn btn- mt-3" > Sign in </button> */}
                            <Button type="submit" className="mt-3 py-2" variant="secondary"  > Sign in </Button>
                            <Row className=" mt-3">
                                <Col xs={6} className="text-end">
                                    {/* <Link href="/" to="/" className="">Forgot Password</Link> */}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }
}

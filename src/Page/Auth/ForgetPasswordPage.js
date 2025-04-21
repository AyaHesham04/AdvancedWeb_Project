import React from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoginHook from '../../hook/auth/login-hook';
import { ToastContainer } from 'react-toastify';
import ForgetPasswordHook from '../../hook/auth/forget-password-hook';
const ForgetPasswordPage = () => {
    const [OnChangeEmail, email, onSubmit] = ForgetPasswordHook()
    return (
        <Container fluid className="forgot-background" style={{ minHeight: '100vh' }}>
            <Row className="my-3 py-5 px-2 d-flex justify-content-center">
                <Col sm="12" md="6" lg="4" className="d-flex flex-column" style={{ border: '3px solid #efc4c3', borderRadius: '10px', padding: '20px', backgroundColor: '#ffffff' }}>
                    <label className="mx-auto title-login">Forgot Password</label>
                    <input
                        value={email}
                        onChange={OnChangeEmail}
                        placeholder="Enter your email..."
                        type="email"
                        className="user-input my-3 text-center mx-auto"
                    />
                    <button onClick={onSubmit} className="btn-login mx-auto mt-2">Send Code</button>
                </Col>

            </Row>
            <ToastContainer />
        </Container>
    )
}

export default ForgetPasswordPage
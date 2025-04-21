import React from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoginHook from '../../hook/auth/login-hook';
import { ToastContainer } from 'react-toastify';
import ResetPasswordHook from '../../hook/auth/reset-password-hook';

const RsetPasswordPage = () => {

    const [password, confirmPassword, , OnChangePassword, OnChangeConfirmPassword, onSubmit] = ResetPasswordHook()

    return (
        <Container fluid className="forgot-background" style={{ minHeight: '100vh' }}>
            <Row className="my-3 py-5 px-2 d-flex justify-content-center">
                <Col sm="12" md="6" lg="4" className="d-flex flex-column" style={{ border: '3px solid #efc4c3', borderRadius: '10px', padding: '20px', backgroundColor: '#ffffff' }}>
                    <label className="mx-auto title-login">Enter New Password</label>
                    <input
                        value={password}
                        onChange={OnChangePassword}
                        placeholder="Enter new password"
                        type="password"
                        className="user-input my-3 text-center mx-auto"
                    />
                    <input
                        value={confirmPassword}
                        onChange={OnChangeConfirmPassword}
                        placeholder="Confirm new password"
                        type="password"
                        className="user-input my-3 text-center mx-auto"
                    />

                    <button onClick={onSubmit} className="btn-login mx-auto mt-2">Save</button>

                </Col>

            </Row>
            <ToastContainer />
        </Container>
    )
}

export default RsetPasswordPage

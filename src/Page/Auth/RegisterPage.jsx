import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { registerUser, clearAuthState } from '../../redux/slices/authSlice';
const RegisterPage = () => {
  const dispatch = useDispatch();
  const { loading, error, registerSuccess } = useSelector(state => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setConfirmPassword] = useState('');
  const onChangeName = (e) => setName(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePhone = (e) => setPhone(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const onChangeConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const navigate = useNavigate();
  const OnSubmit = () => {
    if (password !== passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }
    dispatch(registerUser({ name, email, phone, password, passwordConfirm }))
      .unwrap()
      .then(() => {
        toast.success('Signup successful');
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 1000);
      })
      .catch(error => {
        if (error.errors && Array.isArray(error.errors)) {
          error.errors.forEach(err => toast.error(err.msg));
        } else {
          console.log("error", error);
          toast.error(error.message || 'Signup failed');
        }
      });
  };


  return (
    <Container fluid className="auth-background" style={{ minHeight: '100vh' }}>
      <Row className="py-5 px-2 d-flex justify-content-center hieght-search">
        <Col sm="12" md="6" lg="4" className="d-flex flex-column" style={{ border: '3px solid #efc4c3', borderRadius: '10px', padding: '20px', backgroundColor: '#ffffff' }}>
          <label className="mx-auto title-login">Create a New Account</label>
          <input
            value={name}
            onChange={onChangeName}
            placeholder="Username..."
            type="text"
            className="user-input mt-3 text-center mx-auto"
          />
          <input
            value={email}
            onChange={onChangeEmail}
            placeholder="Email..."
            type="email"
            className="user-input my-3 text-center mx-auto"
          />
          <input
            value={phone}
            onChange={onChangePhone}
            placeholder="Phone..."
            type="phone"
            className="user-input  text-center mx-auto"
          />
          <input
            value={password}
            onChange={onChangePassword}
            placeholder="Password..."
            type="password"
            className="user-input text-center mt-3 mx-auto"
          />
          <input
            value={passwordConfirm}
            onChange={onChangeConfirmPassword}
            placeholder="Confirm Password..."
            type="password"
            className="user-input text-center mt-3 mx-auto"
          />
          <button onClick={OnSubmit} className="btn-login mx-auto mt-4" disabled={loading}>
            {loading ? 'Registering…' : 'Register Account'}
          </button>
          <label className="mx-auto mt-4" style={{ fontSize: '13px' }}>
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span style={{ cursor: "pointer" }} className="auth-text">
                Click here
              </span>
            </Link>
          </label>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  )
}

export default RegisterPage

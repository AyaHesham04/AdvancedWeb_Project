import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserSideBar from '../../Components/User/UserSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser, updateUserPassword, updateUserProfileData } from '../../redux/slices/authSlice';

const UserProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user?.data);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [savingProfile, setSavingProfile] = useState(false);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [savingPassword, setSavingPassword] = useState(false);

    useEffect(() => {
        if (!user) {
            dispatch(fetchUser());
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setPhone(user.phone || '');
        }
    }, [user]);

    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);

    const handleProfileSubmit = async () => {
        const payload =
            email === user.email
                ? {
                    body: { name, phone }
                }
                : {
                    body: { name, email, phone }
                };

        try {
            setSavingProfile(true);
            console.log(payload);
            await dispatch(updateUserProfileData(payload)).unwrap();
            toast.success('Profile updated successfully');
            handleCloseEdit();
        } catch (err) {
            toast.error(err.message || 'Failed to update profile');
        } finally {
            setSavingProfile(false);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            toast.warn('Password confirmation does not match');
            return;
        }
        try {
            setSavingPassword(true);
            await dispatch(
                updateUserPassword({
                    currentPassword: oldPassword,
                    password: newPassword,
                    passwordConfirm: confirmNewPassword
                })
            ).unwrap();

            toast.success('Password changed successfully');

            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (err) {
            toast.error(err.message || 'Failed to change password');
        } finally {
            setSavingPassword(false);
        }
    };

    return (
        <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
            <Row className="py-3 flex-column flex-sm-row">
                <Col sm={3} xs={12} md={3}>
                    <UserSideBar />
                </Col>

                <Col sm={9} xs={12} md={9}>
                    <div>
                        <h2 className="admin-content-text pt-4">Profile Page</h2>

                        {/* —— Edit Profile Modal —— */}
                        <Modal show={showEdit} onHide={handleCloseEdit}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Personal Information</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <input
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    type="text"
                                    className="input-form d-block mt-3 px-3"
                                    placeholder="Username"
                                />
                                <input
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    type="email"
                                    className="input-form d-block mt-3 px-3"
                                    placeholder="Email"
                                />
                                <input
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    type="tel"
                                    className="input-form d-block mt-3 px-3"
                                    placeholder="Phone Number"
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseEdit}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="success"
                                    disabled={savingProfile}
                                    onClick={handleProfileSubmit}
                                >
                                    {savingProfile
                                        ? <Spinner animation="border" size="sm" />
                                        : 'Save Changes'}
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* —— Profile Card —— */}
                        <div className="user-address-card my-2 px-3 py-2">
                            <Row className="d-flex justify-content-between pt-2">
                                <Col xs={6} className="d-flex">
                                    <strong className="p-2">Name:</strong>
                                    <span className="p-1">{user?.name}</span>
                                </Col>
                                <Col xs={6} className="d-flex justify-content-end">
                                    <Button variant="link" onClick={handleShowEdit}>
                                        Edit
                                    </Button>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} className="d-flex">
                                    <strong className="p-2">Phone Number:</strong>
                                    <span className="p-1">{user?.phone}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} className="d-flex">
                                    <strong className="p-2">Email:</strong>
                                    <span className="p-1">{user?.email}</span>
                                </Col>
                            </Row>

                            {/* —— Change Password Form —— */}
                            <Row className="mt-4">
                                <Col xs={12} sm={8} md={6}>
                                    <h5 className="admin-content-text">Change Password</h5>
                                    <input
                                        value={oldPassword}
                                        onChange={e => setOldPassword(e.target.value)}
                                        type="password"
                                        className="input-form d-block mt-2 px-3"
                                        placeholder="Enter Old Password"
                                    />
                                    <input
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        type="password"
                                        className="input-form d-block mt-3 px-3"
                                        placeholder="Enter New Password"
                                        minLength={8}
                                    />
                                    <input
                                        value={confirmNewPassword}
                                        onChange={e => setConfirmNewPassword(e.target.value)}
                                        type="password"
                                        className="input-form d-block mt-3 px-3"
                                        placeholder="Confirm New Password"
                                        minLength={8}
                                    />
                                    <Button
                                        className="mt-3"
                                        onClick={handleChangePassword}
                                        disabled={savingPassword}
                                    >
                                        {savingPassword
                                            ? <Spinner animation="border" size="sm" />
                                            : 'Save Password'}
                                    </Button>
                                </Col>
                            </Row>
                        </div>

                        <ToastContainer position="bottom-center" />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfilePage;

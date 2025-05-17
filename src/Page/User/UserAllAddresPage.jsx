
import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Modal,
    Button,
    Spinner
} from 'react-bootstrap';
import UserSideBar from '../../Components/User/UserSideBar';
import { useDispatch, useSelector } from 'react-redux';
import UserAddressCard from '../../Components/User/UserAddressCard';
import { fetchUser, addUserAddress } from '../../redux/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserAllAddressPage = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.user?.data);
    const adding = useSelector((state) => state.auth.addingAddress);

    const [showAdd, setShowAdd] = useState(false);
    const openAdd = () => setShowAdd(true);
    const closeAdd = () => setShowAdd(false);

    const [alias, setAlias] = useState('');
    const [details, setDetails] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');

    useEffect(() => {
        if (!userData) {
            dispatch(fetchUser());
        }
    }, [dispatch, userData]);

    const handleAddSubmit = async () => {
        if (!alias || !details || !phone) {
            toast.warn('Please fill in alias, details, and phone');
            return;
        }

        try {
            await dispatch(
                addUserAddress({ alias, details, phone, city, postalCode })
            ).unwrap();

            toast.success('Address added!');
            setAlias(''); setDetails(''); setPhone(''); setCity(''); setPostalCode('');
            closeAdd();

            dispatch(fetchUser());
        } catch (err) {
            toast.error(err.message || 'Failed to add address');
        }
    };

    return (
        <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
            <Row className="py-3 flex-column flex-sm-row">
                <Col sm={3} xs={12} md={3}>
                    <UserSideBar />
                </Col>

                <Col sm={9} xs={12} md={9}>
                    <h2 className="admin-content-text pt-4">Address Book</h2>

                    {userData?.addresses?.length > 0 ? (
                        userData.addresses.map((item) => (
                            <UserAddressCard key={item._id} item={item} />
                        ))
                    ) : (
                        <h6>No addresses available yet</h6>
                    )}


                    <Row className="justify-content-center mt-4">
                        <Col sm={5} className="d-flex justify-content-center">
                            <Button variant="primary" onClick={openAdd}>
                                + Add New Address
                            </Button>
                        </Col>
                    </Row>


                    <Modal show={showAdd} onHide={closeAdd}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Address</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input
                                className="input-form d-block mt-2 px-3"
                                placeholder="Alias (e.g., Home, Work)"
                                value={alias}
                                onChange={(e) => setAlias(e.target.value)}
                            />
                            <textarea
                                className="input-form-area d-block mt-3 p-2"
                                placeholder="Detailed Address"
                                rows={3}
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                            />
                            <input
                                className="input-form d-block mt-3 px-3"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <input
                                className="input-form d-block mt-3 px-3"
                                placeholder="City (optional)"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <input
                                className="input-form d-block mt-3 px-3"
                                placeholder="Postal Code (optional)"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeAdd}>
                                Cancel
                            </Button>
                            <Button
                                variant="success"
                                disabled={adding}
                                onClick={handleAddSubmit}
                            >
                                {adding
                                    ? <Spinner animation="border" size="sm" />
                                    : 'Add Address'}
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <ToastContainer position="bottom-center" />
                </Col>
            </Row>
        </Container>
    );
};

export default UserAllAddressPage;

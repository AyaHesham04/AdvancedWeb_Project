import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyAccess } from '../../redux/slices/analyticsSlice';
import dayjs from 'dayjs';
import { BarChart } from '@mui/x-charts';
import CardBestsellersContainer from '../../Components/Products/CardBestsellersContainer';

function AdminAnalyticsPage() {
    const tickPlacement = 'middle';
    const tickLabelPlacement = 'middle';


    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.analytic);
    useEffect(() => {
        dispatch(fetchDailyAccess());
    }, [dispatch]);
    const grouped = (data || []).reduce((acc, entry) => {
        const dayTs = dayjs(entry.date).startOf('day').valueOf();
        if (!acc[dayTs]) {
            acc[dayTs] = { ts: dayTs, count: 0 };
        }
        acc[dayTs].count += entry.count;
        return acc;
    }, {});
    const dataset = Object.values(grouped)
        .sort((a, b) => a.ts - b.ts)
        .map(item => ({
            month: dayjs(item.ts).format('MMM D'),
            count: item.count,
        }));

    const today = dayjs().startOf('day');

    const totalUser = (data || []).reduce((sum, entry) => {
        const entryDate = dayjs(entry.date).startOf('day');
        return entryDate.isSame(today) ? sum + entry.count : sum;
    }, 0);

    return (
        <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
            <Row className='py-3 flex-column flex-sm-row'>
                <Col sm="3" xs="12" md="3">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="12" md="9">
                    <div className="pt-3">
                        <div className="admin-content-text pb-2">Analytics</div>
                        <Row className="d-flex flex-column flex-md-row">
                        <Col xs="12" sm="12" md="12" lg="8" className="mb-3">
                                <Card>
                                    <div className='' style={{ marginLeft: '10px' }}> Daily Active Users</div>
                                    {loading ? (
                                        <h6>Loading...</h6>
                                    ) : error ? (
                                        <h6 style={{ color: 'red' }}>{error}</h6>
                                    ) : (
                                        <>
                                            <BarChart
                                                dataset={dataset}
                                                xAxis={[{
                                                    scaleType: 'band',
                                                    dataKey: 'month',
                                                    tickPlacement,
                                                    tickLabelPlacement,
                                                }]}
                                                series={[{ dataKey: 'count', color: '#efc4c3' }]}
                                                height={300}
                                            />
                                            <BarChart
                                                dataset={dataset}
                                                xAxis={[{
                                                    scaleType: 'band',
                                                    dataKey: 'month',
                                                    tickPlacement,
                                                    tickLabelPlacement,
                                                }]}
                                                series={[{ dataKey: 'count', color: '#efc4c3' }]}
                                                height={300}
                                            />
                                        </>
                                    )}
                                </Card>
                            </Col>
                            <Col xs="12" sm="12" md="12" lg="4" className="d-flex justify-content-center">
                                <Row className="flex-row">
                                    <Col xs="6" sm="6" md="6" lg="12" className="d-flex justify-content-center mb-3">
                                    <Card
                                        style={{
                                            borderRadius: '50%',
                                            width: '150px',
                                            height: '150px',
                                            border: '5px solid #efc4c3',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto'
                                        }}
                                    >
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '14px', marginBottom: '5px' }}>Total Users Today</div>
                                            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalUser}</div>
                                        </div>
                                    </Card>
                                    </Col>
                                    <Col xs="6" sm="6" md="6" lg="12" className="d-flex justify-content-center mb-3">
                                    <Card
                                        style={{
                                            borderRadius: '50%',
                                            width: '150px',
                                            height: '150px',
                                            border: '5px solid #efc4c3',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto'
                                        }}
                                    >
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '14px', marginBottom: '5px' }}>Total Orders</div>
                                            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalUser}</div>
                                        </div>
                                    </Card>
                                    </Col>
                                    <Col xs="6" sm="6" md="6" lg="12" className="d-flex justify-content-center mb-3">
                                    <Card
                                        style={{
                                            borderRadius: '50%',
                                            width: '150px',
                                            height: '150px',
                                            border: '5px solid #efc4c3',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto'
                                        }}
                                    >
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '14px', marginBottom: '5px' }}>3rd</div>
                                            <div style={{ fontSize: '24px', fontWeight: 'bold' }}></div>
                                        </div>
                                    </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <CardBestsellersContainer title="Best Sellers" />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAnalyticsPage
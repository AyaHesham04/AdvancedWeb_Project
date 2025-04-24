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
                        <div className='admin-content-text pb-2'>Analytics</div>
                        <Row className="d-flex flex-row">
                            <div className="col">
                                <Card>
                                    <div className='' style={{ marginLeft: '10px' }}> Daily Active Users</div>
                                    {loading ? (
                                        <div>Loading...</div>
                                    ) : error ? (
                                        <div style={{ color: 'red' }}>{error}</div>
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
                                        </>
                                    )}
                                </Card>
                            </div>
                            <div className="col">
                                <Row className="d-flex flex-row">
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
                                </Row>

                                <Row className="mt-3">
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
                                </Row>
                            </div>
                        </Row>
                        <CardBestsellersContainer title="Best Sellers" />

                    </div>

                </Col>
            </Row>
        </Container>
    )
}

export default AdminAnalyticsPage
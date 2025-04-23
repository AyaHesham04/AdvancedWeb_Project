import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { applyCoupon } from '../../redux/slices/cartSlice';

const useApplyCouponHook = () => {
    const dispatch = useDispatch();
    const [couponName, setCouponName] = useState('');

    const onChangeCoupon = (value) => setCouponName(value);

    const handleSubmitCoupon = async () => {
        if (!couponName.trim()) return;
        await dispatch(applyCoupon(couponName));
    };

    return [couponName, onChangeCoupon, handleSubmitCoupon];
};

export default useApplyCouponHook;

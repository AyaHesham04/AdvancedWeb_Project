import { useDispatch } from 'react-redux';
// import { clearCart } from '../../redux/slices/cartSlice';

const useClearCartHook = () => {
    const dispatch = useDispatch();

    const handleClearCart = () => {
        // dispatch(clearCart());
    };

    return handleClearCart;
};

export default useClearCartHook;

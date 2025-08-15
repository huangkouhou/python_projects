import { useContext } from 'react'; //useContext 是 React 的一个 Hook，作用是让你在组件中获取共享的全局状态（Context）

import CartContext from '../store/CartContext.jsx';
import Modal from './UI/Modal.jsx';
import Button from './UI/Button.jsx';
import { currencyFormatter } from '../util/formatting';
import { UserProgressContext } from '../store/UserProgressContext.jsx';
import CartItem from './CartItem.jsx';

export default function Cart() {
    const cartCtx = useContext(CartContext); //cartCtx 是通过 useContext(CartContext) 得到的购物车上下文对象
    const userProgressCtx = useContext(UserProgressContext); //用 useContext 来获取用户当前进度状态（比如购物车或 checkout）
    
    const cartTotal = cartCtx.items.reduce(//.reduce(...)用来累加或汇总数组中的数据。array.reduce((累加器, 当前项) => { ... }, 初始值)
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );
    //close function in the cart, don't forget to add close function in the Modal.jsx too. cleanup function
    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckOut();
    }

    return (
    <Modal 
        className="cart" 
        open={userProgressCtx.progress === 'cart'}  //当 progress 是 'cart' 时，打开这个弹窗（open = true）；否则关闭（open = false）
        onClose={userProgressCtx.progress === 'cart' ? handleCloseCart: null} //只有当当前处于 'cart' 状态时，才传入 handleCloseCart 回调，否则不传（即 null）。
    >
        <h2>Your Cart</h2>
        <ul>
         {cartCtx.items.map((item) => (
            <CartItem 
            key={item.id} 
            name={item.name} 
            quantity={item.quantity} 
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
            />
         ))}
        </ul>
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
          <Button textOnly onClick={handleCloseCart}>Close</Button>
          {cartCtx.items.length > 0 && (<Button onClick={handleGoToCheckout}>Go to Checkout</Button> 
       )}
        </p>
    </Modal>
    );
}
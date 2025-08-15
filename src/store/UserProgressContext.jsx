import { createContext, useState } from 'react';  //useContext 是 React 的一个 Hook，作用是让你在组件中获取共享的全局状态（Context）

//上下文对象（值的通道），组件内部 useContext(...) 时用
export const UserProgressContext = createContext({
    progress: '', //'cart', 'checkout'
    showCart: () => {},
    hideCart: () => {},
    showCheckOut: () => {},
    hideCheckOut: () => {},
});

//上下文的“提供者组件”，包裹 <App /> 外层，提供值给子组件
export function UserProgressContextProvider({ children }){
    const [UserProgress, setUserProgress] = useState('');

    function showCart() {
        setUserProgress('cart');
    }

    function hideCart() {
        setUserProgress('');
    }

    function showCheckout() {
        setUserProgress('checkout');
    }

    function hideCheckout() {
        setUserProgress('');
    }

    const UserProgressCtx = {
        progress: UserProgress,
        showCart,
        hideCart,
        showCheckOut: showCheckout,
        hideCheckOut: hideCheckout
    };

    return (
        <UserProgressContext.Provider value={UserProgressCtx}>
            {children}
        </UserProgressContext.Provider>
    );
}

export default UserProgressContext;
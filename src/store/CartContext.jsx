import {createContext, useReducer } from 'react'; //使用 React 的 createContext 来创建一个上下文对象，用于跨组件共享数据（例如购物车数据）


const CartContext = createContext({
    items:[],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        //...update the state to add a meal item
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );//用商品 id 查找购物车里有没有相同的商品。

        const updatedItems = [...state.items]; //创建新的数组，用来做后续修改。拷贝一份当前购物车商品数组

        //如果购物车里已存在该商品：就把该商品的数量加 1。
        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {//如果购物车里没有这个商品,就新添加一份这个商品，初始数量为 1。
            updatedItems.push({...action.item, quantity: 1});
        }

        return {...state, items: updatedItems};

    }





    if (action.type === 'REMOVE_ITEM') {
        //...remove an item from the state
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingCartItem = state.items[existingCartItemIndex];//拿出某个已有项（读取）

        const updatedItems = [...state.items];

        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1); //删除购物车中的某个具体商品, remove the item at that index
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity -1, //we create a new item based on the old item where we reduce the quantity
            };
            updatedItems[existingCartItemIndex] = updatedItem; //将更新过数量的商品，替换到 updatedItems 的正确位置上。
            //原来的 updatedItems[0] 是 { id: 'p1', name: '苹果', quantity: 2 }
            //现在变成了 { id: 'p1', name: '苹果', quantity: 1 }
        }

        return {...state, items: updatedItems};
  
    }







    if (action.type === 'CLEAR_CART') {
        return { ...state, items: []};
    }

    return state; //unchange state
}

export function CartContextProvider({children}) {
    const [ cart, dispatchCartAction ] = useReducer(cartReducer, { items: []}); //useReducer() 是更强大的状态管理方式，适合处理复杂的状态逻
    //dispatchCartAction 是你用来告诉 cartReducer 你想对购物车做什么操作（比如添加、删除商品）的函数。

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item });
    }

    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    }


    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART' });
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    };

    console.log(cartContext);

    return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
    );
}

export default CartContext;
import { useEffect, useRef } from 'react';//useRef 是一个可以持久保存值或引用 DOM 节点的工具，它的 .current 属性就像一个小箱子，你随时可以从里面拿值放值，而且不会引起页面重新刷新。
import { createPortal } from 'react-dom';//将组件渲染到另一个 DOM 节点（比如弹窗浮层）

export default function Modal({children, open, onClose, className = ''}) { //this can allow to set the class name in the Cart.jsx
    const dialog = useRef(); //（这里是HTML中的dialog）如果你要 访问 DOM 元素 或者 存储某个“变化但不触发 UI 刷新”的值，用 useRef() 是最合适的！

    useEffect(() => {
        const modal = dialog.current
        if (open) {
            modal.showModal();
        }

        return () => modal.close(); //clean-up function
        //clean-up function 是 useEffect 中 return 出来的清理函数，用于在组件卸载或依赖变化前做“善后处理”，保持组件干净和稳定。
    }, [open]); //依赖值变化时重新运行 [open]

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}> 
            {children}
        </dialog>, 
        document.getElementById('modal')
 );
}
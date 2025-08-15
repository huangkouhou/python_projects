export default function Input({label, id, ...props}) { //...props：接收其他任意附加的属性（比如 type="email"）
    return ( //htmlFor={id} 绑定输入框，使 label 可点击聚焦 input
        <p className="control">
            <label htmlFor={id}>{label}</label> 
            <input id={id} name={id} required {...props}/>
        </p>
    );
}
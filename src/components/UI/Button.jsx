export default function Button({ children, textOnly, className, ...props }) {
    let cssClasses = textOnly ? 'text-button': 'button'; //如果 textOnly 为 true，就使用 .text-button 样式，否则使用 .button 样式
    cssClasses += ' ' + className; //然后将传入的 className 拼接上去，实现样式扩展

    return( <button className={cssClasses}{...props}>
        {children}
    </button> 

    );
}
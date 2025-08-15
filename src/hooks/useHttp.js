import { useEffect, useState, useCallback } from 'react';
//useCallback() 是 React 提供的 Hook，用来“记住”某个函数，避免它在每次组件重新渲染时都被重新创建。

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config); //fetch() 返回的是一个原始的 Response 对象，body 是流式的（还没读出来）。

    const resData = await response.json(); //从 response 中读出的 JSON 数据（信内容）

    if (!response.ok) {
        throw new Error(
            resData.message || 'Something went wrong, failed to send request.'
        );
    }

    return resData;

}

export default function useHttp(url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);// // 用 initialData 作为默认值
    const [error, setError] = useState(); //定义一个状态变量叫 error，一开始它是空的（undefined），如果请求失败时我再通过 setError() 来设置它的值

    function clearData() {
        setData(initialData);
    }

    const sendRequest = useCallback(
        async function sendRequest(data) {
            setIsLoading(true);
            try {
                const resData = await sendHttpRequest(url, {...config, body: data});
                setData(resData);
            } catch (error) {
                setError(error.message || 'Something went wrong!');
            }
            setIsLoading(false);
    }, 
    [url, config] //依赖项数组，只有这两个值变化时，Callback函数才会重新创建
);

    useEffect(() => { //只在是 GET 请求时，自动触发 sendRequest()
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
         sendRequest();
        }
  
    }, [sendRequest, config]); //会在 sendRequest 或 config 改变时运行

    return {
        data,
        isLoading,
        error,
        sendRequest,  //返回出去给组件用
        clearData
    };

}
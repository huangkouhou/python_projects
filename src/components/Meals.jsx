import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import Error from './Error.jsx';

const requestConfig = {};//传一个空对象 {} 表示：“我现在不需要任何特殊配置，使用默认的 GET 请求即可”。this step can aviod infinite loop

export default function Meals() {
    const { 
        data: loadedMeals,
        isLoading, 
        error, 
    } = useHttp('http://localhost:3000/meals', requestConfig, []);
    //传进去的第三个参数 [] 👉 就是 initialData， 还没从服务器拿到数据时，先把 loadedMeals 设为一个空数组。


    if (isLoading) {
        return <p className="center">Fetching meals....</p>;
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error} />;
    }

    return(
    <ul id="meals">
        {loadedMeals.map((meal) => (
            <MealItem key={meal.id} meal={meal}/>
        ))}
    </ul>

    )
}

//map() 会遍历数组里的每一个 meal 对象
// meal 是每个数组元素；
// <MealItem ... /> 是你想对每个 meal 渲染的组件；
// key={meal.id} 是必须的，告诉 React 每个元素的唯一标识（优化性能）；
// meal={meal} 把 meal 数据对象传入子组件。
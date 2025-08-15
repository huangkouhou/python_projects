import { useContext } from 'react';
import { currencyFormatter } from "../util/formatting";
import Button from './UI/Button.jsx'
import CartContext from '../store/CartContext.jsx';

export default function MealItem({meal}) {
    const cartCtx = useContext( CartContext );

    function handleAddMealToCart() {
        cartCtx.addItem(meal);
    }

    return (
    <li className="meal-item">
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/> 
            <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                <p className="meal-item-description">{meal.description}</p>
            </div>
            <p className="meal-item-actions">
                <Button onClick={handleAddMealToCart}>Add to Cart</Button>
            </p>
        </article>
    </li>
 );
}


//MealItem({meal})。从Meals.jsx使用 <MealItem meal={meal} /> 传给 MealItem 一个 prop：meal={meal}
// MealItem 是由 Meals 调用的组件；
// meal={meal} 是作为 prop 传给它的；
// 在 MealItem 组件中，通过 function MealItem({ meal }) 解构得到 meal。
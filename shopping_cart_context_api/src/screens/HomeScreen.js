import products from '../data';
import './HomeScreen.css'



const HomeScreen = () => {
    return (
        <div>
            {
                products.map((product) => (
                    product.name
                ))
            }
        </div>
    )
}

export default HomeScreen;
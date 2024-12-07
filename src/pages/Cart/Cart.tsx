import { getRecord } from '../../utils'
import { STORAGE } from '../../enums/storage'
import ListComponent from '../../components/Product/List/List'
import { CATEGORY } from '../../enums/product'

const Cart: React.FC = (): JSX.Element => {
    const shoppingCart = getRecord(STORAGE.SHOPPING_CART)

    return (
        <>
            <ListComponent
                productsItems={shoppingCart}
                category={CATEGORY.ALL}
                cart={true}
            />
        </>
    )
}

export { Cart }

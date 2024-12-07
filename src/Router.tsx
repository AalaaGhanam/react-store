import { Routes, Route } from 'react-router-dom'
import { ROUTES, STATUS_CODE } from './enums/routes'
import ResultComponent from './components/Result/Result'
import Product from './pages/Product/Products'
import Details from './pages/Product/Details/Details'
import { Cart } from './pages/Cart/Cart'

const AppRouter = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Product />} />
            <Route
                path={`${ROUTES.PRODUCT_DETAILS}/:productId`}
                element={<Details />}
            />
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route
                path={ROUTES.WILD_CARD}
                element={<ResultComponent status={STATUS_CODE.NOT_FOUND} />}
            />
            <Route
                path={ROUTES.SERVER_ERROR}
                element={<ResultComponent status={STATUS_CODE.SERVER_ERROR} />}
            />
        </Routes>
    )
}

export default AppRouter

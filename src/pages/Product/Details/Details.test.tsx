import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import Details from './Details'
import { ROUTES } from '../../../enums/routes'

jest.mock('../../../store/product/ProductActions', () => ({
    getSelectedProduct: jest.fn(),
    addToCart: jest.fn(),
}))

jest.mock('../../../utils', () => ({
    getRecord: jest.fn(() => []),
}))

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}))

const mockStore = configureStore([])

describe('Details Component', () => {
    let store: any

    beforeEach(() => {
        store = mockStore({
            product: {
                selectedProduct: {
                    id: 1,
                    title: 'test Product',
                    description: 'test product description.',
                    category: 'test Category',
                    price: 99.99,
                    rating: { rate: 4 },
                    image: 'https://',
                },
            },
        })
    })

    it('renders the Details component', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`/${ROUTES.PRODUCT_DETAILS}/1`]}>
                    <Routes>
                        <Route path={`${ROUTES.PRODUCT_DETAILS}/:productId`} element={<Details />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText('PRODUCT.ITEM')).toBeInTheDocument()
        expect(screen.getByText('test Product')).toBeInTheDocument()
    })

    it('navigates back when the back button is clicked', () => {
        const navigateMock = jest.fn()
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigateMock)

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`/${ROUTES.PRODUCT_DETAILS}/1`]}>
                    <Routes>
                        <Route path={`${ROUTES.PRODUCT_DETAILS}/:productId`} element={<Details />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        fireEvent.click(screen.getByText('BACK'))
        expect(navigateMock).toHaveBeenCalledWith(-1)
    })

    it('displays a success message when adding to cart', async () => {
        const { getRecord } = require('../../../utils')
        getRecord.mockReturnValueOnce([])

        const { addToCart } = require('../../../store/product/ProductActions')
        addToCart.mockResolvedValueOnce({})

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`/${ROUTES.PRODUCT_DETAILS}/1`]}>
                    <Routes>
                        <Route path={`${ROUTES.PRODUCT_DETAILS}/:productId`} element={<Details />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        fireEvent.click(screen.getByText('PRODUCT.CARD.ADD'))
        expect(addToCart).toHaveBeenCalledWith(store.getState().product.selectedProduct)
    })

    it('displays an error message if the product is already in the cart', async () => {
        const { getRecord } = require('../../../utils')
        getRecord.mockReturnValueOnce([{ id: 1 }])

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`/${ROUTES.PRODUCT_DETAILS}/1`]}>
                    <Routes>
                        <Route path={`${ROUTES.PRODUCT_DETAILS}/:productId`} element={<Details />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        fireEvent.click(screen.getByText('PRODUCT.CARD.ADD'))
        expect(screen.getByText('test Product already in your Cart.')).toBeInTheDocument()
    })
})

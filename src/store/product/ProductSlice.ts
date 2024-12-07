import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    addToCart,
    getAllCategories,
    getAllProducts,
    getProductsByCategory,
    getSelectedProduct,
    removeFromCart,
} from './ProductActions'
import { Product } from '../../models/product.model'
import { getRecord, saveRecord } from '../../utils'
import { STORAGE } from '../../enums/storage'

type ProductState = {
    products: Product[]
    selectedProduct: Product | null
    productId: string
    shoppingCart: Product[]
    categories: []
}

const initialState: ProductState = {
    products: [],
    selectedProduct: null,
    productId: '',
    shoppingCart: [],
    categories: [],
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: { reset: () => initialState },
    extraReducers: (builder) => {
        builder
            .addCase(
                getAllProducts.fulfilled,
                (state, action: PayloadAction<Product[]>) => {
                    state.products = action.payload
                }
            )
            .addCase(
                getSelectedProduct.fulfilled,
                (state, action: PayloadAction<Product>) => {
                    state.selectedProduct = action.payload
                }
            )
            .addCase(
                addToCart.fulfilled,
                (state, action: PayloadAction<Product>) => {
                    state.shoppingCart.push(action.payload)
                    saveRecord(STORAGE.SHOPPING_CART, state.shoppingCart)
                }
            )
            .addCase(
                removeFromCart.fulfilled,
                (state, action: PayloadAction<Product>) => {
                    const shoppingCart = getRecord(STORAGE.SHOPPING_CART)
                    const cart = shoppingCart.filter(
                        (item: Product) => item.id != action.payload.id
                    )
                    saveRecord(STORAGE.SHOPPING_CART, cart)
                }
            )
            .addCase(
                getAllCategories.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.categories = action.payload
                }
            )
            .addCase(
                getProductsByCategory.fulfilled,
                (state, action: PayloadAction<Product[]>) => {
                    state.products = action.payload
                }
            )
    },
})
export const productActions = productSlice.actions
export default productSlice.reducer

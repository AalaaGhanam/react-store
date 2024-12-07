import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils'
import config from '../../config'
import { Product } from '../../models/product.model'

const getAllProducts = createAsyncThunk('product/getAllProducts', async () => {
    const response = await api.get(config.apis.products)
    return response.data
})

const getSelectedProduct = createAsyncThunk(
    'product/getSelectedProduct',
    async (id: string) => {
        const response = await api.get(`${config.apis.products}/${id}`)
        return response.data
    }
)

const addToCart = createAsyncThunk(
    'product/addToCart',
    async (product: Product) => {
        return product
    }
)

const removeFromCart = createAsyncThunk(
    'product/removeFromCart',
    async (product: Product) => {
        return product
    }
)

const getAllCategories = createAsyncThunk(
    'product/getAllCategories',
    async () => {
        const response = await api.get(config.apis.categories)
        return response.data
    }
)

const getProductsByCategory = createAsyncThunk(
    'product/getProductsByCategory',
    async (category: string) => {
        const response = await api.get(config.apis.category + '/' + category)
        return response.data
    }
)

export {
    getAllProducts,
    getSelectedProduct,
    addToCart,
    getAllCategories,
    getProductsByCategory,
    removeFromCart,
}

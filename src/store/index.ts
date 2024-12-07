import { configureStore } from '@reduxjs/toolkit'
import CommonReducer from './common/CommonSlice'
import ProductReducer from './product/ProductSlice'

const store = configureStore({
    reducer: {
        product: ProductReducer,
        common: CommonReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

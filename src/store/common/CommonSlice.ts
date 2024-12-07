import {
    createSlice,
    isFulfilled,
    isPending,
    isRejected,
} from '@reduxjs/toolkit'
import { openNotification } from '../../utils'
import { IError } from '../../models/error.model'

type CommonState = {
    loading: boolean
    errors: IError | null
}

const initialState: CommonState = {
    loading: false,
    errors: null,
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: { reset: () => initialState },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPending, (state) => {
                state.loading = true
            })
            .addMatcher(isFulfilled, (state) => {
                state.loading = false
            })
            .addMatcher(isRejected, (state, action) => {
                state.loading = false
                const error = action.error
                let message = error.message
                let validationErrors
                let errorObject: IError | null = null
                try {
                    const rawResult = error?.message!.toString()
                    const json = rawResult.toString()
                    const parsedData = JSON.parse(json)
                    errorObject = JSON.parse(JSON.stringify(parsedData))
                    validationErrors = errorObject?.validationErrors
                    message = errorObject?.message
                } catch (error) {}
                state.errors = errorObject
                ;(!validationErrors || validationErrors.length === 0) &&
                    openNotification(
                        `${message || 'Unknown error occured'}`,
                        'error'
                    )
            })
    },
})

export const commonActions = commonSlice.actions
export default commonSlice.reducer

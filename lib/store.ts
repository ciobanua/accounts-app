import { configureStore } from "@reduxjs/toolkit"
import accountsSlice from "./features/accounts/accountsSlice"

export const makeStore = () => {
    return configureStore({
        reducer: {
            accounts: accountsSlice,
        }
    })
}

// infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// infer the rootState and appDispatch types from the store itself
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]


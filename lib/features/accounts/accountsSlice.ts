import { Account } from "@/components/custom/ListAccounts"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

export interface RepositoriesState {
    accountsList: Account[],
      transaction: {
        debitAccount: string,
        amount: string,
        creditAccount: string,
    }
}

const initialState: RepositoriesState = {
    accountsList: [],
    transaction: {
        debitAccount: '',
        amount: '',
        creditAccount: '',
    }
}

export const repositoriesSlice = createSlice( {
    name: "accounts",
    initialState,
    reducers: {
        updateAccountsList(state, action: PayloadAction<Account[]>) {
            state.accountsList = action.payload
        },
        updateAccount(state, action: PayloadAction<Account>) {
            const accountIndex = state.accountsList.findIndex(account => account.id === action.payload.id)
            if(accountIndex >= 0) {
                state.accountsList[accountIndex] = action.payload
            }
        },
        updateTransaction(state, action: PayloadAction<{field: keyof typeof initialState.transaction, value: string}>) {
            state.transaction[action.payload.field] = action.payload.value
        },
        resetTransaction(state) {
            state.transaction = initialState.transaction
        },
        getInitialState() {
            return initialState
        }
    }
})

// action creators
export const {updateAccountsList,updateAccount, updateTransaction, resetTransaction, getInitialState} = repositoriesSlice.actions

export default repositoriesSlice.reducer
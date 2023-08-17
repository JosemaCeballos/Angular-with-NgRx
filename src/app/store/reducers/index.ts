import * as fromCustomerReducer from "./app.reducer"
import { createFeatureSelector, createSelector } from "@ngrx/store"

export interface AppState {
    customers: fromCustomerReducer.CustomerState,
}

export const reducers = {
    customers: fromCustomerReducer.reducer
}

export const getState = (state: any) => state
export const getCustomerState = createFeatureSelector<fromCustomerReducer.CustomerState>('customers')
//export const getCustomers = createSelector(getCustomerState, fromCustomerReducer.getCustomers)
export const getCustomers = createSelector(getCustomerState, fromCustomerReducer.customerAdapter.getSelectors().selectAll)

export const getCustomerById = (id: number) => createSelector(getCustomers, (customers) => {
    if (customers) {
        const customerFound = customers.find(customer => customer.id === id)
        return customerFound || {}
    } else {
        return {}
    }
})
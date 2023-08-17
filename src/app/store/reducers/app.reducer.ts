import * as fromCustomerActions from "../actions/customer.action"
import { Customer } from "src/app/models/customer.model"
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export interface CustomerState extends EntityState<Customer> {
    ids: number[];
    entities: any
    loaded: boolean;
    loading: boolean;
    error: string;
}

export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>()

export const defaultCustomer: CustomerState = {
    ids: [],
    entities: {},
    loading: false,
    loaded: false,
    error: ""
}

export const initialState = customerAdapter.getInitialState(defaultCustomer)

export function reducer(state: CustomerState = initialState, action: any) {
    switch (action.type) {
        case fromCustomerActions.LOAD_CUSTOMERS: {
            return {
                ...state,
                loading: true
            }
        }
        case fromCustomerActions.LOAD_CUSTOMERS_SUCCESS: {
            /*return {
                ...state,
                loaded: true,
                loading: false,
                data: action.payload
            }*/
            return customerAdapter.addMany(action.payload, {
                ...state, loaded: true, loading: false,
            })
        }
        case fromCustomerActions.LOAD_CUSTOMERs_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false,
                data: action.payload
            }
        }
        case fromCustomerActions.UPDATE_CUSTOMER_SUCCESS: {
            /*let data = state.data.map((customer) => {
                if (customer.id === action.payload.id) {
                    return action.payload
                } else return customer
            })
            return {
                ...state,
                data,
                loaded: true,
                loading: false
            }*/
            return customerAdapter.updateOne(action.payload, state);
        }
        case fromCustomerActions.UPDATE_CUSTOMER_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }
        case fromCustomerActions.ADD_CUSTOMER_SUCCESS: {
            /* return {
                 ...state,
                 data: [...state.data, action.payload],
                 loaded: true,
                 loading: false
             }*/
            return customerAdapter.addOne(action.payload, {
                ...state, loaded: true, loading: false
            })
        }
        case fromCustomerActions.ADD_CUSTOMER_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }
        case fromCustomerActions.DELETE_CUSTOMER_SUCCESS: {
            /*return {
                ...state,
                data: [...state.data.filter((customer) => customer.id !== action.payload)],
                loaded: true,
                loading: false
            }*/
            return customerAdapter.removeOne(action.payload, {
                ...state, loaded: true, loading: false
            })
        }
        case fromCustomerActions.DELETE_CUSTOMER_FAIL: {
            return {
                ...state,
                errror: action.payload
            }
        }
        default: {
            return state
        }
    }
}

//export const getCustomers = (state: CustomerState) => state.data
export const getCustomerLoaded = (state: CustomerState) => state.loaded
export const getCustomerLoading = (state: CustomerState) => state.loading
export const getCustomerError = (state: CustomerState) => state.error
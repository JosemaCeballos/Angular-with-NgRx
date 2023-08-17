import { Action } from "@ngrx/store";
import { Customer } from "src/app/models/customer.model";

//? GET CUSTOMERS
export const LOAD_CUSTOMERS = "[Customer] Load customers";
export const LOAD_CUSTOMERS_SUCCESS = "[Customer] Load customers success"
export const LOAD_CUSTOMERs_FAIL = "[Customer] Load customers fail"

//! UPDATE CUSTOMER
export const UPDATE_CUSTOMER = "[Customer] Update customer"
export const UPDATE_CUSTOMER_SUCCESS = "[Customer] Update customer success"
export const UPDATE_CUSTOMER_FAIL = "[Customer] Update customer fail"

//? ADD CUSTOMER
export const ADD_CUSTOMER = "[Customer] Add customer"
export const ADD_CUSTOMER_SUCCESS = "[Customer] Add customer success"
export const ADD_CUSTOMER_FAIL = "[Customer] Add customer fail"

//! DELETE CUSTOMER
export const DELETE_CUSTOMER = "[Customer] Delete customer"
export const DELETE_CUSTOMER_SUCCESS = "[Customer] Delete customer success"
export const DELETE_CUSTOMER_FAIL = "[Customer] Delete customer  fail"

export class LoadCustomer implements Action {
    readonly type = LOAD_CUSTOMERS
}

export class LoadCustomerSucess implements Action {
    readonly type = LOAD_CUSTOMERS_SUCCESS

    constructor(public payload: Customer[]) { }
}

export class LoadCustomerFail implements Action {
    readonly type = LOAD_CUSTOMERs_FAIL

    constructor(public payload: any) { }
}

export class UpdateCustomer implements Action {
    readonly type = UPDATE_CUSTOMER

    constructor(public payload: Customer) { }
}
export class UpdateCustomerSuccess implements Action {
    readonly type = UPDATE_CUSTOMER_SUCCESS

    constructor(public payload: any) { }
}
export class UpdateCustomerFail implements Action {
    readonly type = UPDATE_CUSTOMER_FAIL

    constructor(public payload: any) { }
}

export class AddCustomer implements Action {
    readonly type = ADD_CUSTOMER

    constructor(public payload: Customer) { }
}

export class AddCustomerSuccess implements Action {
    readonly type = ADD_CUSTOMER_SUCCESS

    constructor(public payload: Customer) { }
}

export class AddCustomerFail implements Action {
    readonly type = ADD_CUSTOMER_FAIL

    constructor(public payload: any) { }
}

export class DeleteCustomer implements Action {
    readonly type = DELETE_CUSTOMER

    constructor(public payload: number) { }
}

export class DeleteCustomerSuccess implements Action {
    readonly type = DELETE_CUSTOMER_SUCCESS

    constructor(public payload: number) { }
}

export class DeleteCustomerFail implements Action {
    readonly type = DELETE_CUSTOMER_FAIL

    constructor(public payload: number) { }
}

export type CustomerActions =
    LoadCustomer |
    LoadCustomerSucess |
    LoadCustomerFail |
    UpdateCustomer |
    UpdateCustomerSuccess |
    UpdateCustomerFail |
    AddCustomer |
    AddCustomerSuccess |
    AddCustomerFail
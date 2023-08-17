import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, of } from 'rxjs';
import { Action } from '@ngrx/store/src';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromCustomersActions from "../actions/customer.action"
import { CustomerService } from 'src/app/services/customer.service';

@Injectable()
export class CustomerEffects {

    constructor(private actions$: Actions, private customerService: CustomerService) { }

    loadCustomers$: Observable<Action> = createEffect(() => this.actions$.pipe(ofType(fromCustomersActions.LOAD_CUSTOMERS),
        switchMap(() => this.customerService.getCustomers().pipe(
            map(response => {
                return new fromCustomersActions.LoadCustomerSucess(response)
            }),
            catchError(error => of(new fromCustomersActions.LoadCustomerFail(error)))
        ))))

    updateCustomer$: Observable<Action> = createEffect(() => this.actions$.pipe(ofType(fromCustomersActions.UPDATE_CUSTOMER),
        map((action: fromCustomersActions.UpdateCustomer) => action.payload),
        switchMap((payload) => this.customerService.updateCustomer(payload).pipe(
            map((updatedCustomer: any) => new fromCustomersActions.UpdateCustomerSuccess({
                id: updatedCustomer['id'],
                changes: updatedCustomer
            })
            ),
            catchError(error => of(new fromCustomersActions.UpdateCustomerFail(error)))
        ))
    ))

    addCustomer$: Observable<Action> = createEffect(() => this.actions$.pipe(ofType(
        fromCustomersActions.ADD_CUSTOMER),
        map((action: fromCustomersActions.AddCustomer) => action.payload),
        switchMap((payload) => this.customerService.addCustomer(payload).pipe(
            map(response => {
                return new fromCustomersActions.AddCustomerSuccess(response)
            }),
            catchError(error => of(new fromCustomersActions.AddCustomerFail(error)))
        ))
    ))

    deleteCustomer$: Observable<Action> = createEffect(() => this.actions$.pipe(ofType(
        fromCustomersActions.DELETE_CUSTOMER),
        map((action: fromCustomersActions.DeleteCustomer) => action.payload),
        switchMap((payload: number) => this.customerService.deleteCustomer(payload).pipe(
            map(() => {
                return new fromCustomersActions.DeleteCustomerSuccess(payload)
            }),
            catchError(error => of(new fromCustomersActions.DeleteCustomerFail(error)))
        ))
    ))
}
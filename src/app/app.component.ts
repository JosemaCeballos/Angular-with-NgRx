import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from "./store"
import { Customer } from './models/customer.model';
import { NgForm } from "@angular/forms"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud-test-app';
  customers: Customer[] = []
  person: Customer = {}
  display: string = "none"
  isEditModeEnabled: boolean = true
  usuarioInput: string = ""

  constructor(private store: Store<fromStore.AppState>) {
    store.select(fromStore.getCustomers).subscribe(rs => this.customers = rs)
    store.select(fromStore.getCustomerById(1)).subscribe(rs => console.log(rs))
  }

  ngOnInit(): void {
    this.store.dispatch(new fromStore.LoadCustomer())
  }

  openModalDialog() {
    this.isEditModeEnabled = false;
    this.display = 'block';
  }

  closeModal(myForm: NgForm) {
    myForm.reset();
    this.display = 'none';
  }

  editClient(customer: Customer) {
    this.isEditModeEnabled = true
    this.person = { ...customer }
    this.display = "block"
  }

  updateCustomer(myForm: NgForm) {
    this.store.dispatch(new fromStore.UpdateCustomer(myForm.value))
    this.closeModal(myForm)
  }

  addCustomer(myForm: NgForm) {
    let id = new Date().getTime()
    let newCustomer = {
      ...myForm.value,
      id
    }
    if (newCustomer.name !== null && newCustomer !== undefined) {
      this.store.dispatch(new fromStore.AddCustomer(newCustomer))
      this.closeModal(myForm)
    }
  }

  deleteClient(id: any) {
    if (id !== undefined) {
      if (confirm("¿Estas seguro de borrar a este usuario?")) {
        this.store.dispatch(new fromStore.DeleteCustomer(id))
      }
    }
  }
}

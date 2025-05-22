import { Component, Inject, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../model/Customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isBlank } from 'src/app/game/validators/FormValidate';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnInit {

  formCustomer: FormGroup;
  customer: Customer;
  codeError = '';

  constructor(
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<EditCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.formCustomer = formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required, isBlank]],
    });
  }


  ngOnInit(): void {
    if (this.data.client != null) {
      this.customer = Object.assign({}, this.data.client);
    } else {
      this.customer = new Customer();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    this.customerService.saveCustomer(this.customer).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (err) => {
        if (err.status === 400) {
          this.codeError = 'Ya existe un cliente con ese nombre';
        }
      },
    });
  }
}

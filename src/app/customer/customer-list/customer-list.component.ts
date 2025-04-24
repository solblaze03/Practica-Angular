import { Component, OnInit } from '@angular/core';

import { CustomerService } from '../customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Customer } from 'src/app/customer/model/Customer';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
constructor(private customerService: CustomerService, public dialog: MatDialog) {}

  datasource = new MatTableDataSource<Customer>();
  displayedColumns: String[] = ['id', 'name', 'action'];
  


  ngOnInit(): void {
    this.customerService.getCustomer().subscribe((client) => {
      this.datasource.data = client;
    });
  }

  createClient() {
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  editClient(client: Customer){
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      data: {client: client}
    })
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  deleteClient(customer: Customer){
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {title: 'Eliminar cliente', description: 'Atención si borra el cliente perderá sus datos.<br> ¿Desea eliminar el cliente?'}
    })

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.customerService.deleteCustomer(customer.id).subscribe(result =>  {
              this.ngOnInit();
             


            
          })
        }
      }
    )
  }
}

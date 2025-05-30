import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/customer/model/Customer';
import { Game } from 'src/app/game/models/Game';
import { Loan } from '../model/Loan';
import { formatDate } from '@angular/common';
import { LoansService } from '../service/loans.service';
import { isBlank } from 'src/app/game/validators/FormValidate';

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.scss'],
})
export class CreateLoanComponent implements OnInit {
  
  formLoan: FormGroup;
  messageError = '';
  loan: Loan;
  selectedLoanDate = new FormControl('', { validators: [Validators.required] });
  selectedReturnDate = new FormControl();
  filterGame: Game;
  filterCustomer: Customer;
  games: Game[];
  customers: Customer[];
  today: Date = new Date();
  minDate: Date;
  max: Date;

  constructor(
    public dialogRef: MatDialogRef<CreateLoanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoansService,
    private formBuilder: FormBuilder
  ) {
    this.formLoan = formBuilder.group({
      id: [''],
      titleGame: ['', [Validators.required, isBlank]],
      customerName: ['', [Validators.required, isBlank]],
    });
  }

  activateButton(): boolean {
    if (
      this.loan.fechaInicio !== undefined &&
      this.loan.fechaDevolucion !== undefined &&
      this.formLoan.valid
    ) {
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    if (this.data.game != null) {
      this.games = this.data.game;
    }
    if (this.data.customer != null) {
      this.customers = this.data.customer;
    }

    this.loan = new Loan();
    this.minDate = new Date();
    this.max = new Date();
    this.max.setDate(this.max.getDate() + 13);
  }

  onChange() {
    this.messageError = '';
  }

  changeEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.loan.fechaDevolucion = undefined;

    this.loan.fechaInicio = formatDate(event.value, 'YYYY-MM-dd', 'en-US');
    this.minDate = event.value;
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.selectedReturnDate = new FormControl();

    this.messageError = '';
    this.max = new Date(event.value);
    this.max.setDate(event.value.getDate() + 13);
  }
  changeEventReturn(type: string, event: MatDatepickerInputEvent<Date>) {
    this.loan.fechaDevolucion = formatDate(event.value, 'YYYY-MM-dd', 'en-US');
    this.messageError = '';
  }
  cancel() {
    this.dialogRef.close();
  }
  save() {
    this.loanService.save(this.loan).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (err) => {
        if (err.status === 400) {
          this.messageError = 'Ningún campo debe estar vació.';
        } else if (err.status === 409) {
          this.messageError =
            'El juego esta reservado o ya ha superado el limite de prestamos';
        }
      },
    });
  }
}

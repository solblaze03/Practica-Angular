import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Loan } from '../model/Loan';
import { LoansService } from '../service/loans.service';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Pageable } from '../../core/model/Pageable';
import { Game } from 'src/app/game/models/Game';
import { GameService } from 'src/app/game/game.service';
import { CustomerService } from 'src/app/customer/customer.service';
import { Customer } from 'src/app/customer/model/Customer';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateLoanComponent } from '../create-loan/create-loan.component';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-loans-list',
  templateUrl: './loans-list.component.html',
  styleUrls: ['./loans-list.component.scss'],
})
export class LoansListComponent implements OnInit {

  selectedDate = new FormControl();

  filterGame: Game;
  filterCustomer: Customer;
  games: Game[];
  customers: Customer[];

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: String[] = [
    'id',
    'nameGame',
    'nameCustomer',
    'dateLoan',
    'loanRepayment',
    'action',
  ];

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;


  constructor(
    private loansService: LoansService,
    private gameService: GameService,
    private customerService: CustomerService,
    public dialog: MatDialog,
    private paginator: MatPaginatorIntl,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.paginator.itemsPerPageLabel = 'Prestamos por pagina';

    this.paginator.itemsPerPageLabel = 'Autores por pagina';
    this.paginator.previousPageLabel = 'Pagina anterior';
    this.paginator.nextPageLabel = 'Siguiente pagina';
    this.paginator.firstPageLabel = 'Primera pagina';
    this.paginator.lastPageLabel = 'Ultima pagina';

    this.paginator.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ): string => {
      if (length == 0) {
        return 'Pagina 1 de 1';
      }

      const amountPages = Math.ceil(length / pageSize);
      return `Pagina ${page + 1} de ${amountPages}`;
    };

    this.loadPage();

    this.gameService.getGames().subscribe((e) => {
      this.games = e;
    });

    this.customerService.getCustomer().subscribe((e) => {
      this.customers = e;
    });

    this.filterGame = null;
    this.filterCustomer = null;
  }


  clearFilter() {
    this.filterGame = null;
    this.filterCustomer = null;
    this.selectedDate = new FormControl();
    this.loadPage();
  }

  loadPage(event?: PageEvent) {
    const date: Date = this.selectedDate.value;
    let daySelected = null;
    if (date != undefined) {
      daySelected = formatDate(date, 'YYYY-MM-dd', 'en-US');
    }
    this.pageNumber = 0;
    this.totalElements = 0;

    let titleGame: number = null;
    let customerName: number = null;

    if (this.filterGame != null) {
      titleGame = this.filterGame.id;
    }

    if (this.filterCustomer != null) {
      customerName = this.filterCustomer.id;
    }

    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    this.loansService
      .getLoans(pageable, titleGame, customerName, daySelected)
      .subscribe((loan) => {
        this.dataSource.data = loan.content;
        this.pageNumber = loan.pageable.pageNumber;
        this.pageSize = loan.pageable.pageSize;
        this.totalElements = loan.totalElements;
      });
  }

  createLoan() {
    const dialogRef = this.dialog.open(CreateLoanComponent, {
      data: { game: this.games, customer: this.customers },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  delete(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Eliminar préstamo',
        description:
          'Atención si borra el préstamo perderá sus datos.<br> ¿Desea eliminar la prestamo?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loansService.delete(loan.id).subscribe((result) => {
          this.ngOnInit();
        });
      }
    });
  }
}

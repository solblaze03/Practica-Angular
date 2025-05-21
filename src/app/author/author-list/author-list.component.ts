import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from '../model/Author';
import { AuthorService } from '../services/authorService';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from '../../core/model/Pageable';
import { AuthorEditComponent } from '../author-edit/author-edit.component';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent implements OnInit {
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Author>();
  displayedColumns: string[] = ['id', 'name', 'nationality', 'action'];

  constructor(
    private authorService: AuthorService,
    public dialog: MatDialog,
    private paginator: MatPaginatorIntl
  ) {}
  ngOnInit(): void {
    this.loadPage();
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
  }

  loadPage(event?: PageEvent) {
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

    this.authorService.getAuthors(pageable).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }
  createAuthor() {
    const dialogRef = this.dialog.open(AuthorEditComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  editAuthor(author: Author) {
    const dialogRef = this.dialog.open(AuthorEditComponent, {
      data: { author: author },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  deleteAuthor(author: Author) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Eliminar autor',
        description:
          'Atención si borra el autor se perderán sus datos.<br> ¿Desea eliminar el autor?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authorService.deleteAuthor(author.id).subscribe((result) => {
          this.ngOnInit();
        });
      }
    });
  }
}

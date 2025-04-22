import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from '../model/Category';
import { MatTableDataSource } from '@angular/material/table'
import { CategoryService } from '../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { Dialog } from '@angular/cdk/dialog';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit{

  constructor(private categoryService : CategoryService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      categories => this.dataSource.data = categories
    )
  }

  dataSource = new MatTableDataSource<Category>();
  displayedColumns : String[] = ['id','name','action']


  createCategory()   {
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  editCategory(category : Category ){
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data : {category: category}});
    
    dialogRef.afterClosed().subscribe(result => {
      
      this.ngOnInit();
    })
  }


  deleteCategory(category: Category){
    const dialogRef = this.dialog.open(DialogConfirmationComponent , {
      data: { title: 'Eliminar Categoria' , description: 'Atención si borra la categoria perdera sus datos.<br> ¿Desea eliminar la cuenta?' }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if(result) {
          this.categoryService.deleteCategory(category.id).subscribe(result => {
            this.ngOnInit();
          })
        }
      }
    )
  }

}
 
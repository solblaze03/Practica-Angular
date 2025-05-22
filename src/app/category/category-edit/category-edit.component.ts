import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/Category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isBlank } from 'src/app/game/validators/FormValidate';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit {
  
  formCategory: FormGroup;
  category: Category;

  constructor(
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.formCategory = this.formBuilder.group({
      id: [''],
      category: ['category', [Validators.required, isBlank]],
    });
  }

  ngOnInit(): void {
    if (this.data.category != null) {
      this.category = Object.assign({}, this.data.category);
    } else {
      this.category = new Category();
    }
  }

  onSave() {
    this.categoryService.saveCategories(this.category).subscribe((result) => {
      this.dialogRef.close();
    });
  }

  isValid(): boolean {
    return this.formCategory.valid;
  }

  onClose() {
    this.dialogRef.close();
  }
}

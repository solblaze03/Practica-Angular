import { Component, Inject, OnInit } from '@angular/core';
import { Author } from '../model/Author';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthorService } from '../services/authorService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isBlank } from 'src/app/game/validators/FormValidate';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss'],
})
export class AuthorEditComponent implements OnInit {
  groupAuthor: FormGroup;
  author: Author;

  constructor(
    public dialogRef: MatDialogRef<AuthorEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authorService: AuthorService,
    private formBuilder: FormBuilder
  ) {
    this.groupAuthor = formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required, isBlank]],
      nacionalidad: ['', [Validators.required, isBlank]],
    });
  }
  
  ngOnInit(): void {
    if (this.data.author != null) {
      this.author = Object.assign({}, this.data.author);
    } else {
      this.author = new Author();
    }
  }

  onSave() {
    this.authorService.saveAuthor(this.author).subscribe((result) => {
      this.dialogRef.close();
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}

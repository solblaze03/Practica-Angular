import { Component, Inject, OnInit } from '@angular/core';
import { Game } from '../models/Game';
import { Author } from 'src/app/author/model/Author';
import { Category } from 'src/app/category/model/Category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GameService } from '../game.service';
import { CategoryService } from '../../category/services/category.service';
import { AuthorService } from 'src/app/author/services/authorService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isBlank } from '../validators/FormValidate';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss'],
})
export class GameEditComponent implements OnInit {
  game: Game;
  authors: Author[];
  categories: Category[];
  isButtonActive = false;
  categorySelected: Category;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GameEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gameService: GameService,
    private categoryService: CategoryService,
    private authorService: AuthorService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      titleGame: ['', [Validators.required, isBlank]],
      age: ['', [Validators.required]],
      category: ['', [Validators.required]],
      game: ['', [Validators.required]],
    });
  }

  formValid(): Boolean {
    return this.form.valid;
  }



  ngOnInit(): void {
    if (this.data.game != null) {
      this.game = Object.assign({}, this.data.game);
    } else {
      this.game = new Game();
    }

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;

      if (this.game.category != null) {
        const categoryFilter: Category[] = categories.filter(
          (category) => category.id == this.data.game.category.id
        );
        if (categoryFilter != null) {
          this.game.category = categoryFilter[0];
        }
      }
    });

    this.authorService.getAllAuthors().subscribe((authors) => {
      this.authors = authors;

      if (this.game.author != null) {
        const authorFilter: Author[] = authors.filter(
          (author) => author.id == this.data.game.author.id
        );
        if (authorFilter != null) {
          this.game.author = authorFilter[0];
        }
      }
    });
  }

  isValidateAge(age: number): boolean {
    if (age == undefined) {
      return false;
    }

    return true;
  }

  onSave() {
    this.gameService.saveGame(this.game).subscribe((result) => {
      this.dialogRef.close();
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}

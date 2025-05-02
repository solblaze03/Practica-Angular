import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { LoansListComponent } from './loans/loans-list/loans-list.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/games', pathMatch: 'full'
  },
  {
    path: 'categories' , component: CategoryListComponent
  },
  {
    path: 'authors' , component: AuthorListComponent
  },
  {
    path: 'games', component: GameListComponent
  },
  {
    path: 'customers', component: CustomerListComponent
  },
  {
    path: 'loan', component: LoansListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

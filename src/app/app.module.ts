import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './core/header/header.component';
import { CategoryModule } from './category/category.module';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { AuthorModule } from './author/author.module';
import { GameModule } from './game/game.module';
import { CustomerModule } from './customer/customer.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    CategoryModule,
    AuthorModule,
    GameModule,
    CustomerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

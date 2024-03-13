import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { Route, RouterModule } from '@angular/router';
import { ShoppingListService } from './shopping-list.service';

const routes: Route[] = [{ path: '', component: ShoppingListComponent }];

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ShoppingListComponent, ShoppingEditComponent],
  providers: [ShoppingListService],
  bootstrap: [ShoppingListComponent],
})
export class ShoppingListModule {}

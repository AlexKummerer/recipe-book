import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Route[] = [{ path: '', component: ShoppingListComponent }];

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [RouterModule.forChild(routes), SharedModule, FormsModule, ReactiveFormsModule],
  exports: [ShoppingListComponent, ShoppingEditComponent],
  providers: [],
  bootstrap: [ShoppingListComponent],
})
export class ShoppingListModule {}

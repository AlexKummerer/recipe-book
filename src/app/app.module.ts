import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { NavbarToggleDirective } from './shared/navbarToggle.directive';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';


let firebaseConfig: {
  apiKey: "AIzaSyADm_m0_4pcyiUofhis-czN_R4fcaAAdMw",
  authDomain: "ng-course-recipebook-92213.firebaseapp.com",
  projectId: "ng-course-recipebook-92213",
  storageBucket: "ng-course-recipebook-92213.appspot.com",
  messagingSenderId: "678515305136",
  appId: "1:678515305136:web:097d5b078365c70d67e975",
  measurementId: "G-11TKBD59J9"
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    NavbarToggleDirective,
    RecipeStartComponent,
    RecipeEditComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),


  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

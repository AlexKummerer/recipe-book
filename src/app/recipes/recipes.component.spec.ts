import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../auth/auth-interceptor';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipesComponent, RecipeListComponent],
      imports: [RecipesRoutingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            // add other properties if needed
          },
        },

        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component', () => {
    expect(component).toBeDefined();
  });
});

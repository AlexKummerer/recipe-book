import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        DataStorageService,
        AuthService,
        // Add any other dependencies here
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isAuthenticated to false', () => {
    expect(component.isAuthenticated).toBeFalse();
  });

  it('should toggle the visible property', () => {
    component.toggle();
    expect(component.visible).toBeTrue();

    component.toggle();
    expect(component.visible).toBeFalse();
  });
  it('should call the storeRecipes method of the dataStorageService', () => {
    spyOn(component['dataStorageService'], 'storeRecipes');
    component.onSaveData();
    expect(component['dataStorageService'].storeRecipes).toHaveBeenCalled();
  });

  it('should call the logout method of the authService and set isAuthenticated to false', () => {
    spyOn(component['authService'], 'logout');
    component.onLogout();
    expect(component['authService'].logout).toHaveBeenCalled();
    expect(component.isAuthenticated).toBeFalse();
  });

  it('should call the fetchRecipes method of the dataStorageService', () => {
    spyOn(component['dataStorageService'], 'fetchRecipes').and.returnValue({ subscribe: () => {} } as any);
    component.onFetchData();
    expect(component['dataStorageService'].fetchRecipes).toHaveBeenCalled();
  });


  // Add more test cases here
});


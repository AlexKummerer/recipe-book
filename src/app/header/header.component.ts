import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private userSub: Subscription;
  isAuthenticated: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  visible: boolean = false;

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  toggle() {
    this.visible = !this.visible;
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onLogout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'recipe-book';
  loadedFeature = 'recipe';

  constructor(private authService : AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }


  onNavigate(feature: string) {
    console.log(feature);
    this.loadedFeature = feature;

  }

}

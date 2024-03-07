import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recipe-book';
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    console.log(feature);
    this.loadedFeature = feature;

  }

}

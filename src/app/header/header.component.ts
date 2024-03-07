import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

 @Output() featureSelected = new EventEmitter<string>();


  onSelected(feature: string) {
    console.log(feature);
    this.featureSelected.emit(feature);
  }

}

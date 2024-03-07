import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();
  visible: boolean = false;

  onSelected(feature: string) {
    this.featureSelected.emit(feature);
  }

  toggle() {
    this.visible = !this.visible;
  }
}

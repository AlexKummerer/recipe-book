import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';
@Directive({
  selector: '[appNavbarToggle]',
})
export class NavbarToggleDirective {
  constructor(private elRef: ElementRef) {}

  @HostListener('click') onClick() {
    const navbar = document.querySelector('#navbar');
    navbar.classList.toggle('show');
  }
}

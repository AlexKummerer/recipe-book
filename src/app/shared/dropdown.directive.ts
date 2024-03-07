import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';
@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostBinding('class.show') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    const dropdownMenu =
      this.elRef.nativeElement.querySelector('.dropdown-menu');
    if (clickedInside) {
      dropdownMenu.classList.toggle('show');
    } else {
      dropdownMenu.classList.remove('show');
    }

  }
}

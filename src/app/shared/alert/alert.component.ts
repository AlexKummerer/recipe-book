import {
  Component,
  EventEmitter,
  Input,
  Output,

} from '@angular/core';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  entryComponents: [];
  @Input() alertMessage: string;
  @Output() close = new EventEmitter<void>();
  type: string;
  alertTitle: any;
  constructor(

  ) {

  }
  onHandleClose() {

    this.close.emit();
  }
}

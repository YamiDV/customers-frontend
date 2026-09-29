import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-indicator-card',
  styleUrl: './indicator-card.scss',
  templateUrl: './indicator-card.html',
})
export class IndicatorCard {

  @Input() title = '';
  @Input() value = '';
  @Input() subtitle = '';
}

import { Value } from './../../../../node_modules/regjsparser/parser.d';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  title = input<string>();
  content = input<string>();

}

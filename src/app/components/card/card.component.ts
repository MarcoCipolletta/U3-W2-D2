import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iPost } from '../../Modules/i-post';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() post!: iPost;
  @Output() onFormRequest = new EventEmitter<number>();

  openForm(id: number) {
    this.onFormRequest.emit(id);
  }
}

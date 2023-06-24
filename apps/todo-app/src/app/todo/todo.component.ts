import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Todo } from '../services/data.service';

@Component({
  selector: 'ion-todo-todo',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  @Input() todo!: Todo;
}

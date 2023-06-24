import { Component, inject } from '@angular/core';
import { RefresherCustomEvent, IonicModule } from '@ionic/angular';

import { DataService, Message } from '../services/data.service';
import { MessageComponent } from '../message/message.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'ion-todo-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgFor,
        MessageComponent,
    ],
})
export class HomePage {
  private data = inject(DataService);
  constructor() {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }
}

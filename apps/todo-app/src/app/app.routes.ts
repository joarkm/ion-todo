import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'home',
    loadChildren: () => import('./home').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'message/:id',
    loadChildren: () =>
      import('./view-message/view-message.module').then(
        (m) => m.ViewMessagePageModule
      ),
    // loadChildren: () =>
    //   import('./view-message').then((m) => m.VIEW_MESSAGE_ROUTES),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

import { trigger, state, animate, style, transition } from '@angular/animations';

export function slideFromBottom() {
  return trigger('routerTransition', [
    state('void', style({ 'padding-top': '20px', opacity: '0' })),
    state('*', style({ 'padding-top': '0px', opacity: '1' })),
    transition(':enter', [
      animate('0.5s ease-out', style({ opacity: '1', 'padding-top': '0px' }))
    ])
  ]);
}

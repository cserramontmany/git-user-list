import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/models/user-model';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
    transform(users: User[], text: string): User[] {
      return users.filter(user => user.login.includes(text));
  }

}

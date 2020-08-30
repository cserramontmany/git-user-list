# GitUserList

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Carles About:

- The search bar on the home is filtering the list that already have from repo. ( I cannot get users from api using filter field), on the service there's `getFilteredUsers()` method and cros origin from github blocks my call; the url created by the method works on the browser for example: [https://api.github.com/search/users?q=carles](https://api.github.com/search/users?q=carles).
 I buid the search input filtering the first result that I already have on page.



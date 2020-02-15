import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { UserService } from '../shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(public currentUser: UserService) {}
}

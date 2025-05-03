import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any;
  
  constructor(private auth: AuthService) {
    this.user = this.auth.getCurrentUser();
  }
}

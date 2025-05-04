import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username='';
  password='';
  message='';

  constructor(private auth:AuthService){}

  login(){
    const success=this.auth.login(this.username,this.password);

    this.message=success?'Login successfull':'Invalid credentials';
  }
}

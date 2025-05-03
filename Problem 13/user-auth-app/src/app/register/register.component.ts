import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name='';
  email='';
  username='';
  password='';
  message='';

  constructor(private auth:AuthService){}
  // constructor(private auth:)
  

  register(){
    const success=this.auth.register({
      name:this.name,
      email:this.email,
      username:this.username,
      password:this.password
    });

    this.message=success?'Registration successfull':'username already exists';
  }

}

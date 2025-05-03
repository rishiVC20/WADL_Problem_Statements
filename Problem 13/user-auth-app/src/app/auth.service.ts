import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private users:any[]=[];
    private currentUser:any=null;

    register(user:any): boolean{
      const exists=this.users.find(u=>u.username===user.username);
      if(exists){
        return false;
      } 
      this.users.push(user);
      return true;
    }

    login(username:string, password:string):boolean{
      const found=this.users.find(u=>u.username===username && u.password===password);
      if(found){
        this.currentUser=found;
        return true;
      }
      return false;
    }

    getCurrentUser(){
      return this.currentUser;
    }

}

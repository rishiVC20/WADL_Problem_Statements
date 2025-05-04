// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ProfileComponent } from './profile.component';

// describe('ProfileComponent', () => {
//   let component: ProfileComponent;
//   let fixture: ComponentFixture<ProfileComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ProfileComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ProfileComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  user: any;

  constructor(private auth: AuthService) {
    this.user = this.auth.getCurrentUser();
  }
}

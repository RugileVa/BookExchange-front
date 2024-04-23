import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [AuthService]
})
export class RegisterComponent {
  public model = {
    username: "",
    email: "",
    password: ""
  }
  
    constructor(private authService: AuthService, private router: Router) { }
  
    async onSubmit() {
      try {
        //await this.authService.login(this.model.email, this.model.password);
        this.router.navigate(["/login"]);
      } catch (error) {
        console.log(error);
      }
    }
  
}
  

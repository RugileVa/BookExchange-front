
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
  providers: [AuthService]
})
export class LoginComponent {
  public model = {
    email: "",
    password: ""
  }

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit() {
    try {
      await this.authService.login(this.model.email, this.model.password);
      this.router.navigate(["/home"]);
    } catch (error) {
      console.log(error);
      this.errorMessage = 'Username or password not found';
      // Automatically clear the error message after 5 seconds
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);
    }
  }

  async loginGoogle() {
    try {
      await this.authService.loginGoogle();
      this.router.navigate(["/home"]);
    } catch (error) {
      console.log(error);
    }
  }

}



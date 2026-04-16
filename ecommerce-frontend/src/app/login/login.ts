import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, NgForm} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {UserService} from '../_services/user';
import {UserAuthService} from '../_services/user-auth';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {

  constructor(private userService: UserService,
              private userAuthService: UserAuthService,
              private router: Router) {
  }

  ngOnInit(): void {

  }


  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe({
      next: (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.role[0].roleName;
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}

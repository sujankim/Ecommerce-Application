import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {UserService} from '../_services/user';

@Component({
  selector: 'app-user',
  imports: [
    MatCardModule
  ],
  templateUrl: './user.html',
  styleUrls: ['./user.scss']
})
export class User implements OnInit {

  message: string | null = null;
  constructor(private userService: UserService) {}


    ngOnInit(): void {
      this.forUser();
    }

    forUser(){
      this.userService.forUser().subscribe({
        next: (res) => {
          console.log(res);
          this.message = res;
        },
        error: err => {
          console.log(err);
        }
      });
    }


}

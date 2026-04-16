import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {UserService} from '../_services/user';

@Component({
  selector: 'app-admin',
  imports: [MatCardModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss']
})
export class Admin implements OnInit {

  message: string | null = null;
  constructor(private userService: UserService) {}


  ngOnInit(): void {
    this.forAdmin();
  }

  forAdmin(){
    this.userService.forAdmin().subscribe({
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

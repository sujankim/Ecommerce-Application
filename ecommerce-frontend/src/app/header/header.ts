import {Component, ViewChild} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {UserAuthService} from '../_services/user-auth';
import {UserService} from '../_services/user';


@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    RouterOutlet
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  // This connects to #sidenav in your HTML
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private router: Router,
              private userAuthService: UserAuthService,
              protected userService: UserService) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.sidenav) {
        this.sidenav.close();
      }
    });
  }


  // This method is called when menu button is clicked
  public toggleSidenav(){
    this.sidenav.toggle();
  }

  public isLoggedIn():boolean{
    return this.userAuthService.isLoggedIn();
  }

  public logout(){
    this.userAuthService.clear();
    return this.router.navigate(['/login']);
  }

  public isAdmin(){
    return this.userAuthService.isAdmin();
  }

  public isUser(){
    return this.userAuthService.isUser();
  }
}

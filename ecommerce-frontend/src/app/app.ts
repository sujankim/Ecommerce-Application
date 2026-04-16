import { Component } from '@angular/core';
import {Header} from './header/header';
import {RouterOutlet} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, MatSidenavModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected title = 'jwt-frontend';
}

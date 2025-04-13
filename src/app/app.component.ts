import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { User } from './shared/models/user';
import { UserService } from './shared/service/user.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MenuComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public loggedInUser?: User;
  public currentPageTitle!: string;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.loggedInUser = this.userService.getLoggedInUser();
    this.currentPageTitle = 'Home';
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  changeCurrentPageTitle(title: string) {
    this.currentPageTitle = title;
  }

  logout() {
    this.userService.logout();
    this.loggedInUser = undefined;
    window.location.href = 'home';
  }
}

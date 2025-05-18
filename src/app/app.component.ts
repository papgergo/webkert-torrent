import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { User as FireUser } from './shared/models/user';
import { UserService } from './shared/service/user.service';
import { AuthService } from './shared/service/auth.service';
import { Subscription } from 'rxjs';

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
  public isLoggedIn? = false;
  public currentPageTitle!: string;
  public loggedInUser: string | null = null;
  private authSubscription?: Subscription;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.loggedInUser = user ? user.uid : null;
      this.authService.updateLoginStatus(this.isLoggedIn);
    });
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  changeCurrentPageTitle(title: string) {
    this.currentPageTitle = title;
  }

  logout() {
    this.authService.signOut();
  }
}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { User as FireUser } from '@angular/fire/auth';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, MatListModule, MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  public loggedInUser?: FireUser;
  @Input() sidenav!: MatSidenav;
  @Input() isLoggedIn?: boolean = false;
  @Output() pageTitleChange = new EventEmitter<string>();
  @Output() logoutEvent = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  closeMenu(title: string) {
    this.sidenav.toggle();
    this.pageTitleChange.emit(title);
  }

  logout() {
    this.authService.signOut().then(() => {
      this.isLoggedIn = false;
      this.logoutEvent.emit();
      this.closeMenu('Home');
    });
  }
}

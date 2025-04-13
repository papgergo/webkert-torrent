import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../models/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, MatListModule, MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  public loggedInUser?: User;
  @Input() sidenav!: MatSidenav;
  @Output() pageTitleChange = new EventEmitter<string>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loggedInUser = this.userService.getLoggedInUser();
  }

  closeMenu(title: string) {
    this.sidenav.toggle();
    this.pageTitleChange.emit(title);
  }
}

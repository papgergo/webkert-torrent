import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { DatePipe } from '@angular/common';
import { UserService } from '../../shared/service/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, MatCardModule, MatDividerModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  @Input() profile!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const loggedInUser = this.userService.getLoggedInUser();
    if (loggedInUser) {
      this.profile = this.userService.getUser(loggedInUser.email);
    }
  }
}

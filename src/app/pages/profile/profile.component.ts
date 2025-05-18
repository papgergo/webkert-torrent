import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { DatePipe } from '@angular/common';
import { UserService } from '../../shared/service/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription } from 'rxjs';
import { Torrent } from '../../shared/models/torrent';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatDividerModule, MatDividerModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isLoading = false;
  @Input() profileId!: string;

  torrents: Torrent[] = [];
  private subscription: Subscription | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.isLoading = true;
    this.subscription = this.userService.getUserProfile().subscribe({
      next: (data) => {
        if (data != null) {
          this.user = data;
          this.isLoading = false;
        }
      },
    });
  }
}

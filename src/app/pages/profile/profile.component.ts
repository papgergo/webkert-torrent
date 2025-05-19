import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '../../shared/models/user';
import { DatePipe } from '@angular/common';
import { UserService } from '../../shared/service/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Observable, Subscription } from 'rxjs';
import { Torrent } from '../../shared/models/torrent';
import { TimestampToDatePipe } from '../../pipes/timestamp-to-date.pipe';
import { TorrentService } from '../../shared/service/torrent.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TorrentDetailsComponent } from '../torrents/torrent-details/torrent-details.component';
import { TorrentsComponent } from '../torrents/torrents.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-profile',
  imports: [
    MatCardModule,
    MatDividerModule,
    MatDividerModule,
    TimestampToDatePipe,
    DatePipe,
    TorrentsComponent,
    MatProgressSpinner,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isLoading = false;
  @Input() profileId!: string;

  torrentCollection$!: Observable<Torrent[]>;
  dataSource!: MatTableDataSource<Torrent>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: Map<string, string> = new Map([
    ['category', 'Category'],
    ['name', 'Name'],
    ['seeds', 'Seeds'],
    ['size', 'Size'],
    ['uploadDate', 'Upload Date'],
    ['uploader', 'Uploader'],
  ]);

  torrents: Torrent[] = [];
  private subscription: Subscription | null = null;

  constructor(
    private userService: UserService,
    private torrentService: TorrentService
  ) {}

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

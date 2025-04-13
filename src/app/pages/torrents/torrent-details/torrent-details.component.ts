import { Component, Input, OnInit } from '@angular/core';
import { TorrentService } from '../../../shared/service/torrent.service';
import { Torrent } from '../../../shared/models/torrent';
import { DatePipe } from '@angular/common';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-torrent-details',
  imports: [DatePipe, MatFabButton, MatCardModule, MatDivider],
  templateUrl: './torrent-details.component.html',
  styleUrl: './torrent-details.component.scss',
})
export class TorrentDetailsComponent implements OnInit {
  @Input() public torrentId!: number;

  public torrent!: Torrent;
  constructor(private torrentService: TorrentService) {}

  ngOnInit(): void {
    this.torrent = this.torrentService.getTorrent(this.torrentId)!;
  }
}

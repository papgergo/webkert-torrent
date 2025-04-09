import { Component, Input, OnInit } from '@angular/core';
import { TorrentService } from '../../../shared/service/torrent.service';
import { Torrent } from '../../../shared/models/torrent';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-torrent-details',
  imports: [DatePipe],
  templateUrl: './torrent-details.component.html',
  styleUrl: './torrent-details.component.scss',
})
export class TorrentDetailsComponent implements OnInit {
  @Input() public torrentId!: number;

  public torrent!: Torrent;
  constructor(private torrentService: TorrentService) {}

  ngOnInit(): void {
    this.torrentService.getTorrent(this.torrentId).subscribe((t) => {
      if (t) {
        this.torrent = t;
        console.log(t);
      }
    });
  }
}

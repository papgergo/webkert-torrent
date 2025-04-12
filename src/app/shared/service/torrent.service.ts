import { Injectable } from '@angular/core';
import { Torrent } from '../models/torrent';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import torrents from '../../../../public/torrents.json';
import { CategoryEnum } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class TorrentService {
  torrentCollection: Torrent[] = torrents.map((torrent) => ({
    ...torrent,
    uploadDate: new Date(torrent.uploadDate),
    uploader: {
      ...torrent.uploader,
      joinDate: new Date(torrent.uploader.joinDate),
    },
    category: {
      ...torrent.category,
      name: torrent.category.name as keyof typeof CategoryEnum,
    },
  }));

  getTorrents(): Torrent[] {
    return this.torrentCollection;
  }

  getTorrent(torrentId: number): Observable<Torrent | undefined> {
    const foundTorrent = this.torrentCollection.find((t) => t.id == torrentId);
    return of(foundTorrent);
  }
}

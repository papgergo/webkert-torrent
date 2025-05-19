import { Injectable } from '@angular/core';
import { Torrent } from '../models/torrent';
import { BehaviorSubject, from, map, Observable } from 'rxjs';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TorrentService {
  private torrentCollection$ = new BehaviorSubject<Torrent[]>([]);

  constructor(private firestore: Firestore) {
    this.loadTorrentCollection();
  }

  loadTorrentCollection(): void {
    from(this.fetchTorrentCollection()).subscribe((torrents) => {
      this.torrentCollection$.next(torrents);
    });
  }

  private async fetchTorrentCollection(): Promise<Torrent[]> {
    try {
      const torrentColRef = collection(this.firestore, 'Torrents');
      const torrentsSnapshot = await getDocs(torrentColRef);

      return torrentsSnapshot.docs.map((docSnap) => {
        if (!docSnap.exists()) {
          return [];
        }
        return { ...docSnap.data() };
      }) as Torrent[];
    } catch (error) {
      console.error('Error fetching torrents:', error);
      return [];
    }
  }

  getTorrentCollection(): Observable<Torrent[]> {
    return this.torrentCollection$.asObservable();
  }

  getTorrentsByUploaderId(uploaderId: string): Observable<Torrent[]> {
    return this.torrentCollection$.pipe(
      map((torrents) =>
        torrents.filter((torrent) => torrent.uploader.id == uploaderId)
      )
    );
  }

  getTorrentById(torrentId: string): Observable<Torrent | undefined> {
    return this.torrentCollection$.pipe(
      map((torrents) => torrents.find((t) => t.id == torrentId))
    );
  }

  async createTorrent(newTorrent: Torrent): Promise<void> {
    const torrentColRef = collection(this.firestore, 'Torrents');
    const docRef = await addDoc(torrentColRef, newTorrent);
    await updateDoc(doc(this.firestore, 'Torrents', docRef.id), {
      id: docRef.id,
    });
    this.loadTorrentCollection();
  }

  async deleteTorrentById(torrentId: string): Promise<void> {
    const torrentColRef = doc(this.firestore, 'Torrents', torrentId);
    await deleteDoc(torrentColRef);
    this.loadTorrentCollection();
  }

  async updateTorrentById(
    torrentId: string,
    updatedTorrent: Partial<Torrent>
  ): Promise<void> {
    const torrentColRef = doc(this.firestore, 'Torrents', torrentId);
    await updateDoc(torrentColRef, updatedTorrent);
    this.loadTorrentCollection();
  }

  async increaseTorrentSeedCount(torrentId: string): Promise<void> {
    const torrentColRef = doc(this.firestore, 'Torrents', torrentId);
    const torrent = await this.getTorrentById(torrentId).toPromise();
    if (torrent) {
      const updatedTorrent = {
        ...torrent,
        seeds: torrent.seeds++,
      };
      await updateDoc(torrentColRef, updatedTorrent);
    }
  }
  getTorrentsByCategory(category: string): Observable<Torrent[]> {
    return this.torrentCollection$.pipe(
      map((torrents) => torrents.filter((t) => t.category.name === category))
    );
  }

  getTorrentsByName(torrentName: string): Observable<Torrent[]> {
    return this.torrentCollection$.pipe(
      map((torrents) => torrents.filter((t) => t.name.includes(torrentName)))
    );
  }

  getTorrentsByUploader(uploaderName: string): Observable<Torrent[]> {
    return this.torrentCollection$.pipe(
      map((torrents) =>
        torrents.filter((torrent) => torrent.uploader.name === uploaderName)
      )
    );
  }
}

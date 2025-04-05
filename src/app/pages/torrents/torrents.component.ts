import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Torrent } from '../../shared/models/torrent';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoryEnum } from '../../shared/models/category';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-torrents',
  imports: [MatListModule, MatPaginatorModule, MatTableModule, MatIconModule],
  templateUrl: './torrents.component.html',
  styleUrl: './torrents.component.scss',
})
export class TorrentsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    'category', //Category
    'name', //Name
    'seeds', //Seeds
    'size', //Size
    'uploadDate', //Upload date
    'uploader', //Uploader
  ];
  torrentCollection: Torrent[] = [
    {
      id: 0,
      category: { id: 0, name: 'MOVIE' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '20 GB',
      createdDate: new Date(),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 1,
      category: { id: 0, name: 'GAME' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '20 GB',
      createdDate: new Date(),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 2,
      category: { id: 0, name: 'SONG' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '20 GB',
      createdDate: new Date(),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'PROGRAM' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '20 GB',
      createdDate: new Date(),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '20 GB',
      createdDate: new Date(),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
  ];

  dataSource = new MatTableDataSource<Torrent>(this.torrentCollection);

  getCategoryIcon(categoryName: string): string {
    return CategoryEnum[categoryName as keyof typeof CategoryEnum];
  }
}

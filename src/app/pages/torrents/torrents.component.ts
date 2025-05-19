import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Torrent } from '../../shared/models/torrent';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoryEnum } from '../../shared/models/category';
import { MatIconModule } from '@angular/material/icon';
import { TorrentService } from '../../shared/service/torrent.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { TimestampToDatePipe } from '../../pipes/timestamp-to-date.pipe';
import { AbbreviateFileSizePipe } from '../../pipes/abbreviate-file-size.pipe';

@Component({
  selector: 'app-torrents',
  imports: [
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    RouterLink,
    MatProgressSpinner,
    DatePipe,
    TimestampToDatePipe,
    AbbreviateFileSizePipe,
  ],
  templateUrl: './torrents.component.html',
  styleUrl: './torrents.component.scss',
})
export class TorrentsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() userID!: string | undefined;
  public CategoryEnum = CategoryEnum;
  torrentcategory: string = '';
  isLoading = true;
  torrentCollection$!: Observable<Torrent[]>;
  dataSource!: MatTableDataSource<Torrent>;
  expandedTorrent: Torrent | null = null;
  displayedColumns: Map<string, string> = new Map([
    ['category', 'Category'],
    ['name', 'Name'],
    ['seeds', 'Seeds'],
    ['size', 'Size'],
    ['uploadDate', 'Upload Date'],
    ['uploader', 'Uploader'],
  ]);

  constructor(
    private torrentService: TorrentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.userID) {
      this.torrentCollection$ = this.torrentService.getTorrentsByUploaderId(
        this.userID
      );
    } else {
      this.torrentCollection$ = this.torrentService.getTorrentCollection();
    }

    console.log(this.userID);
    this.torrentCollection$.subscribe((torrents) => {
      this.dataSource = new MatTableDataSource<Torrent>(torrents);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });

    this.route.paramMap.subscribe((params) => {
      const categoryName = params.get('categoryName');
      if (categoryName) {
        this.categoryFilter(categoryName);
      } else {
        this.clearCategoryFilter();
      }
    });
  }

  categoryFilter(categoryName: string) {
    this.dataSource.filter = categoryName.trim();
  }

  clearCategoryFilter() {
    this.dataSource.filter = '';
  }

  getCategoryIcon(categoryName: string): string {
    return categoryName;
  }

  isExpanded(torrent: Torrent) {
    return this.expandedTorrent === torrent;
  }

  toggle(torrent: Torrent) {
    this.expandedTorrent = this.isExpanded(torrent) ? null : torrent;
  }

  get displayedColumnKeys() {
    return Array.from(this.displayedColumns.keys());
  }
}

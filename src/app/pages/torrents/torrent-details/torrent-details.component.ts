import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TorrentService } from '../../../shared/service/torrent.service';
import { Torrent } from '../../../shared/models/torrent';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { CommentService } from '../../../shared/service/comment.service';
import { Comment } from '../../../shared/models/comment';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../shared/service/user.service';
import {
  MatProgressSpinner,
  MatSpinner,
} from '@angular/material/progress-spinner';
import {
  combineLatest,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
} from 'rxjs';
import { TimestampToDatePipe } from '../../../pipes/timestamp-to-date.pipe';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AbbreviateFileSizePipe } from '../../../pipes/abbreviate-file-size.pipe';

export interface UserCommentData {
  comment: Comment;
  user: User | null;
}

@Component({
  selector: 'app-torrent-details',
  imports: [
    MatFabButton,
    MatCardModule,
    MatDivider,
    MatIcon,
    MatProgressSpinner,
    TimestampToDatePipe,
    DatePipe,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    AsyncPipe,
    NgIf,
    AbbreviateFileSizePipe,
  ],
  templateUrl: './torrent-details.component.html',
  styleUrl: './torrent-details.component.scss',
})
export class TorrentDetailsComponent implements OnInit, OnDestroy {
  @Input() public torrentId!: string;
  public isLoading = false; //TODO
  public torrent$?: Observable<Torrent | undefined>;
  newCommentText = '';
  public loggedInUser: User | null = null;
  public commentCollection$!: Observable<Comment[]>;
  public userCommentData$!: Observable<UserCommentData[]>;
  private subscription: Subscription | null = null;

  constructor(
    private torrentService: TorrentService,
    private commentService: CommentService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.torrent$ = this.torrentService.getTorrentById(this.torrentId);

    this.commentCollection$ = this.commentService.getTorrentComments(
      this.torrentId
    );

    this.userCommentData$ = this.commentCollection$.pipe(
      switchMap((comments) => {
        if (comments.length === 0) {
          return of([]);
        }
        return combineLatest(
          comments.map((comment) =>
            this.userService.getUserProfileById(comment.userId).pipe(
              map((user) => ({
                comment,
                user,
              }))
            )
          )
        );
      })
    );
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.isLoading = true;
    this.subscription = this.userService.getUserProfile().subscribe({
      next: (data) => {
        if (data != null) {
          this.loggedInUser = data;
          this.isLoading = false;
        }
      },
    });
  }

  async increaseTorrentSeedCount() {
    await this.torrentService.increaseTorrentSeedCount(this.torrentId);
  }

  async onCreateComment() {
    if (this.newCommentText.trim() === '') {
      return;
    }
    const newComment: Comment = {
      text: this.newCommentText,
      torrentId: this.torrentId,
      userId: this.loggedInUser!.id,
      commentDate: new Date(),
    };
    await this.commentService.createComment(newComment);
    this.newCommentText = '';
  }

  async onDeleteComment(commentId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Comment' },
    });
    const confirmed = await dialogRef.afterClosed().toPromise();
    if (!confirmed) {
      return;
    }
    await this.commentService.deleteCommentById(commentId);
  }

  async onDeleteTorrent(torrnetId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Torrent' },
    });
    const confirmed = await dialogRef.afterClosed().toPromise();
    if (!confirmed) {
      return;
    }
    await this.torrentService.deleteTorrentById(torrnetId);
    this.router.navigate(['/torrents']);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

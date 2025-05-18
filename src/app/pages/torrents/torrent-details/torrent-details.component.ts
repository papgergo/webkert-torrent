import { Component, Input, OnInit } from '@angular/core';
import { TorrentService } from '../../../shared/service/torrent.service';
import { Torrent } from '../../../shared/models/torrent';
import { AsyncPipe, DatePipe } from '@angular/common';
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
import { map, Observable, Subscription } from 'rxjs';
import { TimestampToDatePipe } from '../../../pipes/timestamp-to-date.pipe';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface UserCommentData {
  comment: Comment;
  user: User;
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
  ],
  templateUrl: './torrent-details.component.html',
  styleUrl: './torrent-details.component.scss',
})
export class TorrentDetailsComponent implements OnInit {
  @Input() public torrentId!: string;
  public isLoading = false; //TODO
  public torrent?: Torrent;
  newCommentText = '';
  public loggedInUser: User | null = null;
  public commentCollection$!: Observable<UserCommentData[]>;

  private subscription: Subscription | null = null;

  constructor(
    private torrentService: TorrentService,
    private commentService: CommentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.commentCollection$ = this.commentService.getTorrentCommentsWithUser(
      this.torrentId
    );
    this.loadUserProfile();
    // const loggedInUser = this.userService.getLoggedInUser();
    // this.profile = this.userService.getUserByEmail(loggedInUser.email);
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
}

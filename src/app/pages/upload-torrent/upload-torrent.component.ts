import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { Torrent } from '../../shared/models/torrent';
import { MatInputModule } from '@angular/material/input';
import { TorrentService } from '../../shared/service/torrent.service';
import { CategoryEnum } from '../../shared/models/category';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/service/user.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-upload-torrent',
  imports: [
    MatCardModule,
    MatProgressSpinner,
    FormsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIcon,
    MatOption,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './upload-torrent.component.html',
  styleUrl: './upload-torrent.component.scss',
})
export class UploadTorrentComponent {
  isLoading = false;
  uploadError = '';
  newTorrent!: Torrent | null;
  public loggedInUser: User | null = null;
  uploadForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    file: new FormControl(),
  });
  private subscription: Subscription | null = null;
  constructor(
    private torrentService: TorrentService,
    private userService: UserService
  ) {
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

  async onCreateTorrent() {
    this.uploadError = '';
    if (!this.newTorrent) {
      this.uploadError = 'No file uploaded';
      return;
    }
    if (this.uploadForm.invalid) {
      this.uploadError = 'Please fill out all required fields';
      return;
    }
    this.isLoading = true;

    const { name, description, category } = this.uploadForm.value;
    const file = this.uploadForm.value.file;

    // Prepare the torrent object
    const newTorrent: Torrent = {
      id: '',
      name: name || '',
      description: description || '',
      category: CategoryEnum[category as keyof typeof category] || '',
      content: file.name,
      size: file.size,
      uploader: this.loggedInUser!,
      seeds: 0,
      coverImageUrl: 'img/default_poster.jpg',
      uploadDate: new Date(),

      // add other fields as needed
    };

    // Call your service to handle the upload and creation
    await this.torrentService.createTorrent(newTorrent);

    this.isLoading = false;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadForm.patchValue({
        file: file,
      });
      this.newTorrent = file;
    }
  }
}

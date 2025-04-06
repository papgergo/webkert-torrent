import { Injectable } from '@angular/core';
import { Torrent } from '../models/torrent';

@Injectable({
  providedIn: 'root',
})
export class TorrentService {
  torrentCollection: Torrent[] = [
    {
      id: 0,
      category: { id: 0, name: 'MOVIE' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '10 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 1,
      category: { id: 0, name: 'GAME' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '15 GB',
      uploadDate: new Date(Date.now()),
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
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'PROGRAM' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '25 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
    {
      id: 3,
      category: { id: 0, name: 'BOOK' },
      name: 'Kedvenc film',
      seeds: 20,
      size: '30 GB',
      uploadDate: new Date(Date.now()),
      uploader: { id: 0, name: 'Pista', profilePictureUrl: '' },
      description: 'asd',
      coverImageUrl: 'asd',
    },
  ];

  constructor() {}

  getTorrents(): Torrent[] {
    return this.torrentCollection;
  }
}

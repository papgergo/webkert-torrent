import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TorrentsComponent } from './pages/torrents/torrents.component';
import { TorrentDetailsComponent } from './pages/torrents/torrent-details/torrent-details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard, publicGuard } from './shared/guard/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'torrents',
    component: TorrentsComponent,
  },
  {
    path: 'torrents/:torrentId',
    component: TorrentDetailsComponent,
  },
  {
    path: 'profile/:profileId',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [publicGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [publicGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

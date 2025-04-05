import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MenuComponent,
    HomeComponent,
    MatSidenavModule,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'torrent-webpage';

  ngOnInit(): void {}

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }
}

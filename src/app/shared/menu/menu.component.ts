import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, MatListModule, MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  @Input() sidenav!: MatSidenav;

  ngOnInit(): void {
    console.log('szia');
  }

  closeMenu() {
    this.sidenav.toggle();
  }
}

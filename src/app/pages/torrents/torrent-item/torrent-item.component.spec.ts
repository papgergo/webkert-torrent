import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentItemComponent } from './torrent-item.component';

describe('TorrentItemComponent', () => {
  let component: TorrentItemComponent;
  let fixture: ComponentFixture<TorrentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TorrentItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorrentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

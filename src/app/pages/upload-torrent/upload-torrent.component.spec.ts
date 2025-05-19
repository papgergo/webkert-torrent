import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTorrentComponent } from './upload-torrent.component';

describe('UploadTorrentComponent', () => {
  let component: UploadTorrentComponent;
  let fixture: ComponentFixture<UploadTorrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadTorrentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadTorrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SoundcloudService } from './soundcloud.service';

describe('SoundcloudService', () => {
  let service: SoundcloudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundcloudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

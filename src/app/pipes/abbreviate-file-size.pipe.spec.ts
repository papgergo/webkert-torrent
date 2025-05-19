import { AbbreviateFileSizePipe } from './abbreviate-file-size.pipe';

describe('AbbreviateFileSizePipe', () => {
  it('create an instance', () => {
    const pipe = new AbbreviateFileSizePipe();
    expect(pipe).toBeTruthy();
  });
});

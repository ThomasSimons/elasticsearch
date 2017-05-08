import { BatmanPage } from './app.po';

describe('batman App', function() {
  let page: BatmanPage;

  beforeEach(() => {
    page = new BatmanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

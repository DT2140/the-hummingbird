import Page from './page';

export default class TumbleInWind extends Page {
  preload() {
    this.game.load.image('background', '/assets/backgrounds/First-Flight-Frame-3.png');
  }

  create() {
    super.create();

    const background = this.game.add.sprite(0, 0, 'background');
    this.fillCenter(background);
  }
}

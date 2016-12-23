import Page from './Page';

export default class TheLeap extends Page {
  preload() {
    this.game.load.image('background', '/assets/backgrounds/First-Flight-Frame-2.png');
  }

  create() {
    super.create();

    const background = this.game.add.sprite(0, 0, 'background');
    this.fillCenter(background);
  }
}

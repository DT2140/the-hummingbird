import Page from './Page';

export default class OnceUpon extends Page {
  preload() {
    this.game.load.image('mountains', '/assets/backgrounds/01-Mountains.svg');
    this.game.load.image('sky', '/assets/backgrounds/01-Sky.svg');
    this.game.load.image('tree and lake', '/assets/foregrounds/01-Tree & Lake.svg');
  }

  create() {
    super.create();

    const sky = this.game.add.sprite(0, 0, 'sky');
    const background = this.game.add.sprite(0, 0, 'mountains');
    const treelake = this.game.add.sprite(0, 0, 'tree and lake');
  }
}

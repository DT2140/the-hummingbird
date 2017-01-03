export default class Page extends Phaser.State {
  constructor(script, subscribe) {
    super();

    let currentLine = 0;

    this.getLine = () => script.lines[currentLine];

    subscribe((state, prev, send) => {
      if (state.isMatch && (script.lines.length > currentLine + 1)) {
        currentLine += 1;
        send('transcript', '');
      }
    });
  }

  loadBackground(backgroundImage) {
    this.game.load.image('background', '/assets/backgrounds/' + backgroundImage);
    this.hasBackgroud = true;
  }

  loadMiddleground(middlegroundImage) {
    this.game.load.image('middleground', '/asset/middlegrounds/' + middlegroundImage);
    this.hasMiddleground = true;
  }

  loadForeground(foregroundImage) {
    this.game.load.image('foreground', '/asset/foregrounds/' + foregroundImage);
    this.hasForeground = true;
  }

  fillCenter(sprite) {
    const {
      game
    } = this;
    const proportion = game.width / sprite.width;

    sprite.scale.setTo(proportion, proportion);
    sprite.position.set(0, (game.height / 2) - (sprite.height / 2));
  }

  create() {
    this.game.stage.backgroundColor = 0xffffff;

    if (this.hasBackgroud) {
      this.background = this.game.add.sprite(0, 0, 'background');
      this.fillCenter(this.background);
    }

    if (this.hasMiddleground) {
      this.middleground = this.game.add.sprite(0, 0, 'middleground');
      this.fillCenter(this.middleground);
    }

    if (this.hasForeground) {
      this.foreground = this.game.add.sprite(0, 0, 'foreground');
      this.fillCenter(this.foreground);
    }
  }
}

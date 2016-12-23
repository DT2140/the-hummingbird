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

  fillCenter(sprite) {
    const { game } = this;
    const proportion = game.width / sprite.width;

    sprite.scale.setTo(proportion, proportion);
    sprite.position.set(0, (game.height / 2) - (sprite.height / 2));
  }

  create() {
    this.game.stage.backgroundColor = 0xffffff;
  }
}

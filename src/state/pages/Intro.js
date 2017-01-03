import Page from './Page';

export default class Intro extends Page {
  preload() {
    this.game.load.spritesheet('bird', 'assets/characters/flapping.png', 135, 86, 4);
  }

  create() {
    super.create();

    const { game } = this;

    game.physics.arcade.gravity.y = 2600;

    const ground = this.ground = game.add.sprite(0, game.height - game.height / 5, 'ground');

    ground.width = game.width;
    ground.height = 20;

    game.add.image(0, 0, ground);
    game.physics.enable(ground, Phaser.Physics.ARCADE);
    ground.body.immovable = true;
    ground.body.allowGravity = false;

    const bird = this.bird = game.add.sprite(0, 0, 'bird');

    bird.position.set((game.width / 2) - (bird.width / 2), game.height / 2 - bird.height);

    game.physics.enable(bird, Phaser.Physics.ARCADE);
    bird.body.collideWorldBounds = true;
    bird.inputEnabled = true;

    bird.animations.add('flap');
    bird.frame = 1;
    this.clicked = 0;
    bird.events.onInputDown.add(event => {
      this.clicked += 1;
      clearTimeout(this.clicker);
      if (this.clicked < 5) {
        this.clicker = setTimeout(() => { this.clicked = 0; }, 500);
      }
    }, this);
  }

  update() {
    const { game, bird, ground, clicked } = this;

    if (clicked) {
      if (bird.y > (game.height / 2)) {
        bird.body.velocity.y = -150;
      }
      bird.animations.play('flap', 25, true);
    } else {
      bird.animations.stop();
      bird.frame = 3;
      game.physics.arcade.collide(bird, ground);
    }
  }
}

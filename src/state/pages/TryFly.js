import Page from './Page';

export default class TryFly extends Page {
  preload() {

    this.loadSky('sky.png');
    //this.loadBackground('...');
    this.loadForeground('branch.png');

    this.game.load.video('hummingbird', '/assets/animations/02.Son.TryFly.webm');
  }

  create() {

    super.create();
    const hummingbird = this.game.add.video('hummingbird');
/*
    this.foreground.y = this.game.height - this.foreground.height;
    this.foreground.x -= this.foreground.width / 10;
    this.foreground.y += this.foreground.height / 10;
*/
    hummingbird.loop = false;
    hummingbird.addToWorld(this.foreground.width/3, this.foreground.height/2, 0.5, 0.5, 0.25, 0.25);

    this.queue('hummingbirdFly', done => {
      hummingbird.play(true);
      setTimeout(done, hummingbird.duration * 1000);
    });
  }
}

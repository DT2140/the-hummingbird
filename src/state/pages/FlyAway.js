import Page from './Page';

export default class FlyAway extends Page {
	preload(){
    this.loadSky('sky.png');
    this.loadBackground('mountain.png');
    this.loadMiddleground('clouds.png');
    this.loadForeground('branch3.png');
	  
    this.game.load.video('wave', '/assets/animations/04.Son.Wave.webm');
    this.game.load.video('motherFly', '/assets/animations/04.Mother.FlyAway.webm');
    this.game.load.video('fatherFly', '/assets/animations/04.Father.FlyAway.webm');

  }
  create(){
    super.create();

    this.background.position.set(0, this.game.height - this.background.height);
	this.foreground.position.set(0, this.foreground.height/3);
	this.middleground.position.set(0, 0);

    const motherFly = this.game.add.video('motherFly');
    motherFly.loop = false;
    motherFly.addToWorld(this.foreground.width * 0.55, this.foreground.y + this.foreground.height * 0.3, 0.5, 0.5, 0.225, 0.225);
	
    const fatherFly = this.game.add.video('fatherFly');
    fatherFly.loop = false;
    fatherFly.addToWorld(this.foreground.width * 0.45, this.foreground.y + this.foreground.height * 0.25, 0.5, 0.5, 0.25, 0.25);
		
    const wave = this.game.add.video('wave');
    wave.loop = true;
    wave.addToWorld(this.foreground.width * 0.2, this.foreground.y + this.foreground.height * 0.2, 0.5, 0.5, 0.25, 0.25);
    wave.play(true);


    this.queue('flewAway', done => {
	  motherFly.play(true)
	  setTimeout(() => { motherFly.destroy(); }, motherFly.duration * 1000);
      fatherFly.play(true).onComplete.add(done)
	  setTimeout(() => { fatherFly.stop(); }, fatherFly.duration * 1000);

    })
  }
}
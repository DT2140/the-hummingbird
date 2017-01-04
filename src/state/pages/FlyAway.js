import Page from './Page';

export default class FlyAway extends Page {
	preload(){
    this.loadSky('sky.png');
    this.loadBackground('mountain-wide.png');
	      //this.loadMiddleground('...');
    this.loadForeground('branch3.png');
	  
    this.game.load.video('wave', '/assets/animations/04.Son.Wave.webm');
    this.game.load.video('motherFly', '/assets/animations/04.Mother.FlyAway.webm');
    this.game.load.video('fatherFly', '/assets/animations/04.Father.FlyAway.webm');

  }
  create(){
    super.create();

	this.foreground.position.set(0, this.foreground.height/3);
	
    const motherFly = this.game.add.video('motherFly');
    motherFly.loop = false;
    motherFly.addToWorld(this.foreground.width/ 2, this.foreground.height/2, 0.3, 0.6, 0.225, 0.225);
	
    const fatherFly = this.game.add.video('fatherFly');
    fatherFly.loop = false;
    fatherFly.addToWorld(this.foreground.width/ 2, this.foreground.height/2,.9, 1.2, 0.15, 0.15);
		
    const wave = this.game.add.video('wave');
    wave.loop = true;
    wave.addToWorld(this.foreground.width/ 2, this.foreground.height/2, 0, 0, 0.15, 0.15);
    wave.play(true);


    this.queue('flewAway', done => {
	  motherFly.play(true)
	  setTimeout(() => { motherFly.destroy(); }, motherFly.duration * 1000);
      fatherFly.play(true).onComplete.add(done)
	  setTimeout(() => { fatherFly.stop(); }, fatherFly.duration * 1000);

    })
  }
}
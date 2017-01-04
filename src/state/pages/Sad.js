import Page from './Page';

export default class Sad extends Page {
  preload(){
    this.loadSky('sky.png');
    this.loadBackground('mountain-wide.png');
    this.loadMiddleground('lake.png');
    this.loadForeground('branch2.png');
	  
    this.game.load.video('sad', '/assets/animations/03.Son.Sad.webm');
    this.game.load.video('angry', '/assets/animations/03.Mother.Angry.webm');
    this.game.load.video('observing', '/assets/animations/03.Father.Observing.webm');

  }
  create(){
    super.create();

    this.middleground.position.set(0, this.background.y + this.background.height);
	
    const sad = this.game.add.video('sad');
    sad.loop = false;
    sad.addToWorld(this.foreground.width * 0.4, this.foreground.height * 0.41, 0.5, 0.5, 0.225, 0.225);
		
    const angry = this.game.add.video('angry');
    angry.loop = false;
    angry.addToWorld(this.foreground.width * 0.21, this.foreground.height * 0.15, 0.5, 0.5, 0.15, 0.15);
		
    const observing = this.game.add.video('observing');
    observing.loop = true;
    observing.addToWorld(this.foreground.width * 0.77, this.foreground.height * 0.45, 0.5, 0.5, 0.15, 0.15);
    observing.play(true);
		
	
    this.queue('angryMother', done => {
	  sad.play(true);
      angry.play(true).onComplete.add(done);
      done();
    })
  }
}
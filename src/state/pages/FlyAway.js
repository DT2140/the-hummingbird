import Page from './Page';

export default class FlyAway extends Page {
	preload(){
    this.loadSky('sky.png');
    this.loadBackground('mountain-wide.png');
	      //this.loadMiddleground('...');
    this.loadForeground('branch2.png');
	  
    this.game.load.video('wave', '/assets/animations/04.Son.Wave');
    this.game.load.video('motherFly', '/assets/animations/04.Mother.FlyAway');
    this.game.load.video('fatherFly', '/assets/animations/04.Father.FlyAway');

  }
  create(){
    super.create();
	
    const sad = this.game.add.video('wave');
    sad.loop = false;
    sad.addToWorld(this.foreground.width/ 2, this.foreground.height/2, 0.3, 0.6, 0.225, 0.225);
		
    const angry = this.game.add.video('motherFly');
    angry.loop = false;
    angry.addToWorld(this.foreground.width/ 2, this.foreground.height/2,.9, 1.2, 0.15, 0.15);
		
    const observing = this.game.add.video('fatehrFly');
    observing.loop = true;
    observing.addToWorld(this.foreground.width/ 2, this.foreground.height/2, 0, 0, 0.15, 0.15);
    observing.play(true);
		
	//TODO: fix so both animatons can play at the same time	
	
    this.queue('angryMother', done => {
      angry.play(true).onComplete.add(done);
    })
	
    this.queue('sadHummingbird', done => {
      sad.play(true).onComplete.add(done);
    })
  }
}
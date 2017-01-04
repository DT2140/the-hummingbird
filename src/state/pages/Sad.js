import Page from './Page';

export default class Sad extends Page {
  preload(){
    this.loadSky('sky.png');
      //this.loadBackground('...');
    this.loadMiddleground('mountain-wide.png');
    this.loadForeground('branch2.png');
	  
    this.game.load.video('sad', '/assets/animations/03.Son.Sad.webm');
    this.game.load.video('angry', '/assets/animations/03.Mother.Angry.webm');
    this.game.load.video('observing', '/assets/animations/03.Father.Observing.webm');

/*	
      this.game.load.video('son','/assets/animations/03.Son.Sad.webm');
      this.game.load.video('motherangry','/assets/animations/03.Mother.Angry.webm');
      this.game.load.video('father','/assets/animations/03.Father.Observing.webm');
*/
  }
  create(){
    super.create();
/*		
		const son = this.game.add.video(0,0,'son');
		son.loop = false;
		son.addToWorld(sky.width/2, sky.height/2, 0.5, 0.5, 0.5, 0.5);
		const motherangry = this.game.add.sprite(0,0,'motherAngry');
		const father = this.game.add.video(0,0,'father');		
*/		
    const sad = this.game.add.video('sad');
    sad.loop = false;
    sad.addToWorld(this.foreground.width/ 2, this.foreground.height/2, 0.3, 0.6, 0.225, 0.225);
		
    const angry = this.game.add.video('angry');
    angry.loop = false;
    angry.addToWorld(this.foreground.width/ 2, this.foreground.height/2,.9, 1.2, 0.15, 0.15);
		
    const observing = this.game.add.video('observing');
    observing.loop = true;
    observing.addToWorld(this.foreground.width/ 2, this.foreground.height/2, 0, 0, 0.15, 0.15);
    observing.play(true);
		
    this.queue('angryMother', done => {
      angry.play(true).onComplete.add(done);
    })
	
    this.queue('sadHummingbird', done => {
      sad.play(true).onComplete.add(done);
    })
  }
}
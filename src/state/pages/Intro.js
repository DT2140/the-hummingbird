import Page from './Page';

export default class Intro extends Page {
  preload() {  
	//set sprites
    this.loadBackground('sky.png');
	this.loadMiddleground('mountain-wide.png');
	this.loadForeground('branch.png');
  }
	
  create () {
	super.create();
	
	this.middleground.scale.setTo(1, 1);
    const proportion = this.game.height / this.middleground.height;
	 
	this.middleground.scale.setTo(proportion, proportion);
	
	//offset position to get tween to end at right position
	this.middleground.position.set(-200, 0);
	this.foreground.position.set(-500, 0);

	//check if tween is completed
	this.isTweened = false;
	
	this.tweenImage(this.middleground, 0, 4000);
	this.tweenImage(this.foreground, 0, 4000).onComplete.add(()=>{
		this.isTweened = true;
		
		/*here we will:
			1.fade in characters
			2.activate the speech recognition
		*/
	});
  }
  
  //tween function
  tweenImage(sprite, position, time) {
    const tween = this.game.add.tween(sprite);
	tween.to({x: position}, time, 'Linear', true, 0);
	return tween;
  }
}


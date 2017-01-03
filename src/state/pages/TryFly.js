import Page from './Page';

export default class TryFly extends Page {
	preload(){

		this.loadBackground('sky2.png');
		this.loadForeground('branch.png');

		//this.game.load.video('tryfly','/assets/animations/02.Son.TryFly.webm')
	}
	create(){
		super.create();

		this.foreground.y = this.game.height - this.foreground.height;
		this.foreground.x -= this.foreground.width / 10;
		this.foreground.y += this.foreground.height / 10;

	}
}
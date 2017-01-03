import Page from './Page';

export default class TryFly extends Page {
	preload(){
		this.game.load.image('sky','/assets/backgrounds/02-Sky.svg');
		this.game.load.image('branch','/assets/foregrounds/02-Branch.svg');
		this.game.load.image('bird','/assets/foregrounds/02-Son.Still.svg');
		//this.game.load.video('tryfly','/assets/animations/02.Son.TryFly.webm')
	}
	create(){
		super.create();

		const sky = this.game.add.sprite(0,0,'sky');
		const branch = this.game.add.sprite(0,0,'branch');
		const bird = this.game.add.sprite(-270,-200,'bird')
		
		//const tryfly = this.game.add.video(0,0,'tryfly')
		//this.fillCenter(sky);
	}
}
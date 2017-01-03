import Page from './Page';

export default class FlyAway extends Page {
	preload(){
		this.game.load.image('sky','/assets/backgrounds/04-Sky.svg');
		this.game.load.image('mountains','/assets/backgrounds/04-Mountains.svg');
		this.game.load.image('clouds','/assets/middlegrounds/04-Clouds.svg');
		this.game.load.image('branch','/assets/foregrounds/04-Branch.svg');
		this.game.load.image('mother','/assets/foregrounds/04-Mother.Still.svg');
		this.game.load.image('father','/assets/foregrounds/04-Father.Still.svg');

		/*
		this.game.load.video('son','/assets/animations/04.Son.Wave.webm');
		this.game.load.video('motherflyaway','/assets/animations/04.Mother.FlyAway.webm');
		this.game.load.video('fatherflyaway','/assets/animations/04.Father.FlyAway.webm');
		*/

		}
		create(){
			super.create();
			const sky = this.game.add.sprite(0,0,'sky');
			const mountains = this.game.add.sprite(0,0,'mountains');
			const clouds = this.game.add.sprite(0,0,'clouds');
			const branch = this.game.add.sprite(0,0,'branch');
			const mother = this.game.add.sprite(-200,-300,'mother');
			const father = this.game.add.sprite(0,-300,'father');

			/*
			const son = this.game.add.video(0,0,'son');
			const motherflyaway = this.game.add.video(0,0,'motherflyaway');
			const fatherflyaway = this.game.add.video(0,0,'fatherflyaway');
			*/

			//this.fillCenter(sky);
		}
}
import Page from './Page';

export default class Sad extends Page {
	preload(){
		this.game.load.image('sky','/assets/backgrounds/03-Sky.svg');
		this.game.load.image('mountains','/assets/backgrounds/03-Mountains.svg');
		this.game.load.image('lake','/assets/middlegrounds/03-Lake.svg');
		this.game.load.image('branch','/assets/foregrounds/03-Branch.svg');
		this.game.load.image('mother','/assets/foregrounds/03-Mother.Still.svg');
		
		/*
		this.game.load.video('son','/assets/animations/03.Son.Sad.webm');
		this.game.load.video('motherangry','/assets/animations/03.Mother.Angry.webm');
		this.game.load.video('father','/assets/animations/03.Father.Observing.webm');
		*/
	}
	create(){
		super.create();
		const sky = this.game.add.sprite(0,0,'sky');
		const mountains = this.game.add.sprite(0,0,'mountains');
		const lake = this.game.add.sprite(0,0,'lake');
		const branch = this.game.add.sprite(0,0,'branch');
		const mother = this.game.add.sprite(-600,-400,'mother');

		/*
		const son = this.game.add.video(0,0,'son');
		const motherangry = this.game.add.sprite(0,0,'motherangry');
		const father = this.game.add.video(0,0,'father');
		*/

		//this.fillCenter(sky);
		
	}
}
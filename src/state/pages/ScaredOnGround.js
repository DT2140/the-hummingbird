import Page from './Page';

export default class ScaredOnGround extends Page {
  preload() {
        this.loadBackground('sky.png');
		this.loadMiddleground('mountain-wide.png');
		this.loadForeground('branch.png');
  }
}

export default function createStory(parent) {
  return new Phaser.Game(parent.offsetWidth, parent.offsetWidth * 0.625, Phaser.AUTO, parent);
}

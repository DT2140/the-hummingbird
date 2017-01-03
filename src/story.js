export default function createStory(parent) {
  return new Phaser.Game(parent.offsetWidth, parent.offsetHeight, Phaser.AUTO, parent);
}

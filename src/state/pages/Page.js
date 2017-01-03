export default class Page extends Phaser.State {
  constructor(script, subscribe) {
    super();

    let currentLine = 0;
    let running = Promise.resolve();
    const triggered = [];
    const actions = [];

    // Get current line from script
    this.getLine = () => script.lines[currentLine];

    // Queue up an action
    this.queue = (name, fn) => { actions[name] = fn; };

    // Trigger action by name
    this.trigger = action => {
      if (!triggered.includes(action)) {
        triggered.push(action);
      }

      // Wrap action in promise to prevent chaos
      return new Promise(resolve => actions[action](resolve));
    };

    subscribe((state, prev, send) => {
      const { isMatch, transcript, page, choke } = state;

      // Progress through lines if there are more than one line
      if (isMatch && (script.lines.length > currentLine + 1)) {
        currentLine += 1;
      }

      // Handle page queues
      if (script.queues) {
        for (let queue of script.queues) {
          const { word, action } = queue;
          const match = page.getLine().split(' ').slice(0, choke);

          // Trigger queues that have not been previously triggered
          if (!triggered.includes(action) && match.includes(word)) {
            // Bundle queues using `running` promise
            running = running.then(() => this.trigger(queue.action));

            // Notify application of keyword
            send('keyword', word);
          }
        }
      }
    });
  }

  loadBackground(backgroundImage) {
    this.game.load.image('background', '/assets/backgrounds/' + backgroundImage);
    this.hasBackgroud = true;
  }

  loadMiddleground(middlegroundImage) {
    this.game.load.image('middleground', '/assets/middlegrounds/' + middlegroundImage);
    this.hasMiddleground = true;
  }

  loadForeground(foregroundImage) {
    this.game.load.image('foreground', '/assets/foregrounds/' + foregroundImage);
    this.hasForeground = true;
  }

  fillCenter(sprite) {
    const { game } = this;
    const proportion = game.width / sprite.width;

    sprite.scale.setTo(proportion, proportion);
    sprite.position.set(0, (game.height / 2) - (sprite.height / 2));
  }

  create() {
    this.game.stage.backgroundColor = 0xffffff;

    if (this.hasBackgroud) {
      this.background = this.game.add.sprite(0, 0, 'background');
      this.fillCenter(this.background);
    }

    if (this.hasMiddleground) {
      this.middleground = this.game.add.sprite(0, 0, 'middleground');
      this.fillCenter(this.middleground);
    }

    if (this.hasForeground) {
      this.foreground = this.game.add.sprite(0, 0, 'foreground');
      this.fillCenter(this.foreground);
    }
  }
}

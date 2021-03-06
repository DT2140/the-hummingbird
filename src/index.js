import createStory from './story';
import createState from './state';
import createSubtitle from './subtitle';
import createMicrophone from './microphone';
import createControls from './controls';

const LANG = process.env.STORY_LANG;

/**
 * Using `require` and inlining env due to brfs being picky
 */

const fs = require('fs');
const script = JSON.parse(
  fs.readFileSync(
    __dirname + '/manuscript/' + process.env.STORY_LANG + '.json',
    'utf-8'
  )
);

const controls = createControls(script);
const subtitle = createSubtitle(document.querySelector('.js-subtitle'));
const microphone = createMicrophone(document.querySelector('.js-microphone'), LANG);
const storyboard = createStory(document.querySelector('.js-storyboard'));
const state = createState(storyboard, script);

function render(state, prev, send) {
  microphone(state, prev, send);
  subtitle(state, prev, send);
  controls(state, prev, send);
}

state.subscribe(render);

state.send('page', 0);

if (process.env.NODE_ENV === 'development') {
  window.STORY = { send: state.send };
}

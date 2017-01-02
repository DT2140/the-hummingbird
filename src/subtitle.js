import { similarity } from './utils';

const PRECISION = process.env.STORY_RECOGNITION_PRECISION;

export default function subtitles(element) {
  let isInitialized = false;
  let ticker = false;

  function nextTick(line, transcript) {
    if (!ticker) {
      requestAnimationFrame(() => {
        ticker = false;

        const words = line.split(' ');
        const results = transcript.toLowerCase().split(' ');
        let isMatch = true;

        /**
         * Run through all words in script and determine matches
         */

        Array.prototype.forEach.call(element.children, (child, index) => {
          const script = words.slice(0, index + 1).join(' ');
          const result = results.slice(0, index + 1).join(' ');
          const match = similarity(script, result) > PRECISION;

          if ((!isMatch || !result[index]) && !match) {
            child.classList.remove('is-match');
            isMatch = false;
          } else {
            child.classList.add('is-match');
          }
        });
      });
    }

    ticker = true;
  }

  function setText(text) {
    const children = text.split(' ').map(word => {
      return `<span class="Subtitle-word">${ word }</span>`;
    });

    element.innerHTML = children.join(' ');
  }

  return (state, prev, send) => {
    if (state.transcript !== prev.transcript) {
      const script = state.page.getLine();

      setText(script);
      nextTick(script, state.transcript);
    } else if (!isInitialized) {
      setText(state.page.getLine());
      isInitialized = true;
    }
  };
}

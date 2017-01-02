import { similarity } from './utils';

const PRECISION = parseFloat(process.env.STORY_RECOGNITION_PRECISION);

export default function subtitles(element) {
  let isInitialized = false;
  let ticker = false;

  function nextTick(line, transcript) {
    if (!ticker) {
      requestAnimationFrame(() => {
        ticker = false;

        const words = line.split(' ');
        const results = transcript.split(' ');
        let isMatch = true;

        /**
         * Run through all words in script and determine matches
         */

        Array.prototype.forEach.call(element.children, (child, index) => {
          const script = words.slice(0, index + 1).join(' ');
          const result = results.slice(0, index + 1).join(' ');
          const match = similarity(script, result) > PRECISION;

          if (!isMatch || (!results[index] || !match)) {
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
    const script = state.page.getLine();

    if (prev.page.getLine() !== script) {
      setText(script);
    } else if (!state.isSpeaking && !state.isMatch) {
      for (let child of element.children) {
        child.classList.remove('is-match');
      }
    }

    if (state.transcript !== prev.transcript) {
      nextTick(script, state.transcript);
    } else if (!isInitialized) {
      setText(state.page.getLine());
      isInitialized = true;
    }
  };
}

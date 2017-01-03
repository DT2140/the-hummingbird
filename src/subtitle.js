import similarity from './utils/similarity';
import spawnParticles from './utils/particles';

const PRECISION = parseFloat(process.env.STORY_RECOGNITION_PRECISION);

export default function subtitles(element) {
  let ticker = false;
  let stoppedOn = 0;
  let chokedOn = 0;
  let isInitialized = false;

  function nextTick(line, transcript, keywords, send) {
    if (!ticker) {
      requestAnimationFrame(() => {
        ticker = false;

        const children = element.children;
        const words = line.split(' ');
        const results = transcript.split(' ');

        let isMatch = true;

        chokedOn = words.length;

        /**
         * Run through all words in script and determine matches
         */

        for (var i = stoppedOn; i < words.length; i += 1) {
          const script = words.slice(stoppedOn, i + 1).join(' ');
          const result = results.slice(0, i - stoppedOn + 1).join(' ');
          const match = similarity(script, result);

          if (isMatch && (!results[i - stoppedOn] || match < PRECISION)) {
            chokedOn = i;
            isMatch = false;
          }

          children[i].classList.remove('is-loading');
          children[i].classList.toggle('is-match', isMatch);

          if (keywords.includes(words[i])) {
            children[i].classList.add('is-keyword');
          }
        }

        if (chokedOn > stoppedOn) {
          const lastMatch = children[chokedOn - 1];
          const { left, top, width } = lastMatch.getBoundingClientRect();
          spawnParticles(left + width / 2, top + 10);
        }

        if (isMatch) {
          send('match', true);
        } else {
          children[chokedOn].classList.add('is-loading');
        }
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
      stoppedOn = 0;
    }

    if (!state.isSpeaking && !state.isLoading) {
      stoppedOn = chokedOn;

      for (let child of element.children) {
        child.classList.remove('is-loading');
      }
    }

    if (state.transcript !== prev.transcript) {
      nextTick(script, state.transcript, state.keywords, send);
    } else if (!isInitialized) {
      setText(state.page.getLine());
      isInitialized = true;
    }
  };
}

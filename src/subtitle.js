import similarity from './utils/similarity';
import spawnParticles from './utils/particles';
import { strip } from './utils/transcript';

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
          const script = words.slice(stoppedOn, i + 1).map(strip).join(' ');
          const result = results.slice(0, i - stoppedOn + 1).join(' ');
          const match = similarity(script, result);

          if (isMatch && (!results[i - stoppedOn] || match < PRECISION)) {
            chokedOn = i;
            isMatch = false;
          }

          children[i].classList.remove('is-loading');
          children[i].classList.toggle('is-match', isMatch);
        }

        /**
         * Roll back choke to closest phrase break
         */

        if (!isMatch && !/^\//.test(words[chokedOn])) {
          for (let i = chokedOn; i > -1; i -= 1) {
            element.children[i].classList.remove('is-match');
            if (/^\//.test(words[i])) {
              chokedOn = i;
              break;
            }
          }
        }

        if (chokedOn > stoppedOn) {
          const lastMatch = children[chokedOn - 1];
          const { left, top, width } = lastMatch.getBoundingClientRect();
          spawnParticles(left + width / 2, top + 10);
        }

        if (!isMatch) {
          children[chokedOn].classList.add('is-loading');
        }

        send('choke', chokedOn);
      });
    }

    ticker = true;
  }

  function setText(text) {
    const children = text.split(' ').map(word => {
      return `<span class="Subtitle-word">${ strip(word) }</span>`;
    });

    element.innerHTML = children.join(' ');
  }

  return (state, prev, send) => {
    const script = state.page.getLine();

    if (prev.page.getLine() !== script) {
      setText(script);
    }

    const words = script.split(' ').map(strip);

    for (let i = 0; i < words.length; i += 1) {
      if (state.keywords.includes(words[i])) {
        const child = element.children[i];

        if (!child.classList.contains('is-keyword')) {
          const { left, top, width } = child.getBoundingClientRect();

          spawnParticles(left + width / 2, top + 10);

          child.classList.add('is-keyword');
        }
      }
    }

    if (state.transcript !== prev.transcript) {
      // nextTick(script, state.transcript, state.keywords, send);
    } else if (!isInitialized) {
      setText(state.page.getLine());
      isInitialized = true;
    }
  };
}

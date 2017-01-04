import { strip } from './utils/transcript';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

const ENV = process.env.NODE_ENV;

export default function microphone(button, lang) {
  let line, timeout, sendMatch, sendNext;
  let isTicking = false;
  let isInitialized = false;
  let isPressed = false;

  /**
   * Check that speech recognition is supported
   */

  if (typeof SpeechRecognition !== 'function') {
    throw (new Error('Speech not supported'));
  }

  /**
   * Set up speech recognition interface
   */

  let final;
  const recognition = new SpeechRecognition();

  return (state, prev, send) => {
    const { isSpeaking, isMatch, page, index, choke, transcript } = state;
    const nextLine = page.getLine();
    let isActive = false;

    /**
     * Redefine on every state change so as to always use latest state
     */

    sendMatch = () => send('transcript', {
      isFinal: true,
      transcript: strip(nextLine)
    });
    sendNext = () => {
      const nextWord = nextLine.split(' ').slice(choke, choke + 1);

      send('transcript', {
        isFinal: true,
        transcript: strip(`${ transcript } ${ nextWord }`)
      });
    };

    /**
     * Start a ticker when transcript matches script
     */

    if (isMatch && !isTicking) {
      isTicking = true;
      page.next(() => {
        button.classList.add('is-ticking');
        timeout = setTimeout(() => {
          recognition.abort();
          send('isSpeaking', false);
          send('page', index + 1);
        }, 3800);
      });
    }

    /**
     * Cancel the timeout if user is no longer speaking or there is no match
     */

    if (isTicking && (!isMatch || !isSpeaking)) {
      isTicking = false;
      clearTimeout(timeout);
      button.classList.remove('is-ticking');
    }

    /**
     * Add new grammar if the script has changed
     */

    if (nextLine !== line) {
      const grammars = new SpeechGrammarList();
      grammars.addFromString(`#JSGF V1.0; grammar line; public <line> = ${ nextLine.toLowerCase() } ;`, 1);
      recognition.grammars = grammars;
      line = nextLine;
    }

    /**
     * Handle when the user starts speaking
     */

    if (isSpeaking !== prev.isSpeaking) {
      button.classList.toggle('is-active', isSpeaking);

      if (isSpeaking) {
        recognition.start();
      } else {
        recognition.stop();
      }
    }

    /**
     * Handle loading state
     */

    button.classList.toggle('is-loading', !state.isSpeaking && state.isLoading);

    /**
     * Set up speech recognition at the first chance
     */

    if (!isInitialized) {
      isInitialized = true;

      const onStart = () => send('speaking', true);
      const onEnd = () => send('speaking', false);

      /**
       * Hook up event listeners to handle speaking
       */

      button.addEventListener('mousedown', onStart);
      button.addEventListener('touchstart', onStart);
      window.addEventListener('keydown', event => {
        if (isPressed) {
          if (event.which === 88 && ENV === 'development') {
            sendMatch();
          } else if (event.which === 90 && ENV === 'development') {
            sendNext();
          }
        } else if (event.which === 32) {
          onStart();
          isPressed = true;
          event.preventDefault();
        }
      });

      button.addEventListener('mouseup', onEnd);
      button.addEventListener('touchend', onEnd);
      window.addEventListener('keyup', event => {
        if (event.which === 32) {
          onEnd();
          isPressed = false;
          event.preventDefault();
        }
      });

      /**
       * Extend SpeechRecognition instance with config and event handles
       */

      Object.assign(recognition, {
        continuous: true,
        interimResults: true,
        lang: lang,
        maxAlternatives: 1,

        /**
         * Reset results and prepare for recieving results
         */

        onstart() {
          final = '';
        },

        /**
         * Handle interim and final results
         */

        onresult(event) {
          // Don't be sending actions while ticking
          if (isTicking) { return; }

          const { resultIndex, results } = event;
          let interim = '';

          for (let i = resultIndex; i < results.length; i += 1) {
            if (results[i].isFinal) {
              final += results[i][0].transcript;
            } else {
              interim += results[i][0].transcript;
            }
          }

          if (interim) {
            send('transcript', { transcript: interim, isFinal: false });
          }
        },

        /**
         * Handle when error occurs, i.e. microphone not permitted
         */

        onerror(event) {
          send('speaking', false);
          throw event.error;
        },

        /**
         * Override interim with final result
         */

        onend() {
          send('transcript', { transcript: final, isFinal: true });
        }
      });
    }
  };
}

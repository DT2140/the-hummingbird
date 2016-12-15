export default function subtitles(element) {
  let isInitialized = false;
  let ticker = false;
  const nextTick = (line, transcript) => {
    if (!ticker) {
      requestAnimationFrame(() => {
        ticker = false;

        const words = line.split(' ');
        const results = transcript.toLowerCase().split(' ');
        let text = ['<span class="Subtitle-match">'];
        let isMatch = true;

        /**
         * Run through all words in script and determine matches
         */

        for (let i = 0; i < words.length; i += 1) {
          const result = results[i];
          const word = words[i];

          /**
           * End span of matches if there are no more words or matches
           */

          if (isMatch && (!result || result !== word.toLowerCase())) {
            text.push('</span>');
            isMatch = false;
          }

          text.push(word);
        }

        /**
         * Make sure to close up that span if it was a complete match
         */

        if (isMatch) {
          text.push('</span>');
        }

        /**
         * Output script to DOM
         */

        element.innerHTML = text.join(' ');
      });
    }

    ticker = true;
  };

  return (state, prev, send) => {
    if (state.transcript !== prev.transcript) {
      nextTick(state.page.getLine(), state.transcript);
    } else if (!isInitialized) {
      element.innerHTML = state.page.getLine();
      isInitialized = true;
    }
  };
}

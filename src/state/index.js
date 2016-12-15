import sendAction from 'send-action';
import index from './pages';

const merge = (...args) => Object.assign({}, ...args);

export default function createState(story, script) {
  const subscribers = [];
  const subscribe = fn => subscribers.push(fn);

  /**
   * Create all pages feeding them the script
   */

  const pages = index.map((Page, index) => {
    // Compose a custom subscriber that is only triggered when page is active
    const pageSubscriber = fn => subscribers.push((state, prev, send) => {
      if (state.index === index) { fn(state, prev, send); }
    });

    // Create page instance and add its index for ease of access
    const page = new Page(script.pages[index], subscribe);

    // Add the page as a state to the story
    story.state.add(`page_${ index }`, page);

    return page;
  });

  /**
   * Set up the state machine
   */

  const send = sendAction({

    /**
     * Handle actions triggered using `send`
     * @param  {Object} state  Current state
     * @param  {String} action Type of action performed
     * @param  {Mixed}  data   Any data sent with action
     * @return {Object}        Next state
     */

    onAction(state, action, data) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.info(`Action "${ action }": `, data);
      }

      switch (action) {
        // Store transcript and wether it is a complete match
        case 'transcript': return merge(state, {
          transcript: data,
          isMatch: data.toLowerCase() === state.page.getLine().toLowerCase()
        });

        case 'page': {
          // Set page state in story
          story.state.start(`page_${ data }`);

          // Set page-dependant props to their initial values
          return merge(state, {
            transcript: '',
            isMatch: false,
            index: data,
            page: pages[data]
          });
        }

        // Relay that user is speaking to state
        case 'speaking': return merge(state, { isSpeaking: data });

        // Just return prevous state for unrecognized actions
        default: return state;
      }
    },

    /**
     * Trigger all subscribers on state change
     * @param  {Object} state  Current state
     * @param  {Object} prev   Previous state
     * @return {Void}
     */

    onChange(state, prev) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.info('New state: ', state);
      }

      for (let subscriber of subscribers) {
        subscriber(state, prev, send);
      }
    },

    /**
     * Initial state
     */

    state: {
      transcript: '',
      isMatch: false,
      isSpeaking: false,
      index: 0,
      page: pages[0]
    }
  });

  /**
   * Espose only the send and subscribe methods
   */

  return { send, subscribe };
}

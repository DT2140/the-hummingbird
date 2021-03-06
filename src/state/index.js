import sendAction from 'send-action';
import index from './pages';
import similarity from '../utils/similarity';

const PRECISION = parseFloat(process.env.STORY_RECOGNITION_PRECISION);

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
    const page = new Page(script.pages[index], pageSubscriber);

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

        case 'transcript': {
          const { keywords } = state;
          const words = state.page.getLine();
          const queues = script.pages[state.index].queues;
          const next = merge(state, {
            isLoading: !data.isFinal,
            transcript: data.transcript
          });

          for (let queue of queues) {
            const { word } = queue;
            if (data.transcript.match(word) && !keywords.includes(word)) {
              next.keywords = keywords.concat([ word ]);
            }
          }

          if (next.keywords.length === queues.length) {
            next.isMatch = true;
          }

          return next;
        }

        case 'page': {
          // Set page state in story
          story.state.start(`page_${ data }`);

          // Set page-dependant props to their initial values
          return merge(state, {
            transcript: '',
            isMatch: false,
            isLoading: false,
            choke: 0,
            keywords: [],
            index: data,
            page: pages[data]
          });
        }

        // Relay that user is speaking to state
        case 'speaking': return merge(state, {
          isSpeaking: data,
          transcript: data ? '' : state.transcript
        });

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
      isLoading: false,
      keywords: [],
      choke: 0,
      index: 0,
      page: pages[0]
    }
  });

  /**
   * Espose only the send and subscribe methods
   */

  return { send, subscribe };
}

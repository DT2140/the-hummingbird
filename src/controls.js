const ENV = process.env.NODE_ENV;

export default function controls(script) {
  let time = 0;
  let down = 0;
  let delta = 0;
  let isPressed = false;
  let isTriggered = false;
  let onSwipe = () => {};
  let gotoPage = () => {};
  let sendNext = () => {};

  window.addEventListener('touchstart', onTouchStart);
  window.addEventListener('touchend', onTouchEnd);
  window.addEventListener('touchmove', onTouchMove);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  function onTouchStart(event) {
    time = Date.now();
    down = event.touches[0].clientX;
  }

  function onTouchEnd(event) {
    delta = 0;
    time = 0;
    isTriggered = false;
  }

  function onTouchMove(event) {
    delta = down - event.touches[0].clientX;

    if (!isTriggered && Math.abs(delta) >= 9 && Date.now() - time < 250) {
      isTriggered = true;
      onSwipe(delta > 0 ? 1 : -1);
    }
  }

  function onKeyDown(event) {
    const page = event.which - 48 - 1;

    if (page > -1 && page < 10) {
      gotoPage(page);
    } else if (event.which === 32) {
      isPressed = true;
    } else if (isPressed && event.which === 90 && ENV === 'development') {
      sendNext();
    }
  }

  function onKeyUp(event) {
    if (event.which === 32) {
      isPressed = false;
    }
  }

  return (state, prev, send) => {
    const { index, keywords } = state;
    const queues = script.pages[index].queues;

    onSwipe = direction => send('page', state.index + direction);
    gotoPage = page => send('page', page);
    sendNext = () => send('transcript', {
      isFinal: true,
      transcript: queues[keywords.length].word
    });
  };
}

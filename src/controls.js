export default function controls() {
  let time = 0;
  let down = 0;
  let delta = 0;
  let onSwipe = () => {};
  let gotoPage = () => {};
  let isTriggered = false;

  window.addEventListener('touchstart', event => {
    time = Date.now();
    down = event.touches[0].clientX;
  });
  window.addEventListener('touchend', event => {
    delta = 0;
    time = 0;
    isTriggered = false;
  });
  window.addEventListener('touchmove', event => {
    delta = down - event.touches[0].clientX;

    if (!isTriggered && Math.abs(delta) >= 9 && Date.now() - time < 250) {
      isTriggered = true;
      onSwipe(delta > 0 ? 1 : -1);
    }
  }, false);
  window.addEventListener('keydown', event => {
    const page = event.which - 48 - 1;

    if (page > -1 && page < 10) {
      gotoPage(page);
    }
  });

  return (state, prev, send) => {
    onSwipe = direction => send('page', state.index + direction);
    gotoPage = page => send('page', page);
  };
}

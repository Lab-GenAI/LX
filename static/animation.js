const containerEl = document.getElementById('hero-rotating-text');
const itTextEl = document.getElementById('hero-it-text');
const textEls = Array.from(containerEl.querySelectorAll('[data-hero-rotating-text]'));

const interval = 1500; // Reduced interval to speed up rotation

let activeElement = 0;

function rotateText() {
  setTimeout(rotateText, interval);

  const oldTextEl = textEls[activeElement];

  activeElement += 1;
  if (activeElement === textEls.length) {
    activeElement = 0;
  }

  const newTextEl = textEls[activeElement];

  const oldTextBeforeBoundingRect = oldTextEl.getBoundingClientRect();
  const itTextBeforeBoundingRect = itTextEl.getBoundingClientRect();
  oldTextEl.classList.add('is-inactive');
  newTextEl.classList.remove('is-inactive');
  newTextEl.classList.remove('is-hidden');
  const oldTextAfterBoundingRect = oldTextEl.getBoundingClientRect();
  const itTextAfterBoundingRect = itTextEl.getBoundingClientRect();

  const oldTextLeftPosition =
    oldTextBeforeBoundingRect.left - oldTextAfterBoundingRect.left;
  const oldTextTopPosition =
    oldTextBeforeBoundingRect.top - oldTextAfterBoundingRect.top;
  const itTextLeftPosition =
    itTextBeforeBoundingRect.left - itTextAfterBoundingRect.left;

  const oldTextAnimationPlayer = oldTextEl.animate([{
    opacity: 1,
    transform: `translateX(${oldTextLeftPosition}px) translateY(${oldTextTopPosition}px)`,
  }, {
    opacity: 0,
    transform: `translateX(${oldTextLeftPosition}px) translateY(0)`,
  }], {
    duration: 200, // Reduced duration for faster animation
    fill: 'forwards',
    easing: 'linear', // Changed easing to 'linear'
  });
  oldTextAnimationPlayer.onfinish = () => {
    oldTextEl.classList.add('is-hidden');
  };

  newTextEl.animate([{
    opacity: 0,
    transform: 'translateY(100%)',
  }, {
    opacity: 1,
    transform: 'translateY(0)',
  }], {
    duration: 200, // Reduced duration for faster animation
    fill: 'both',
    easing: 'linear', // Changed easing to 'linear'
  });

  itTextEl.animate([{
    transform: `translateX(${itTextLeftPosition}px)`,
  }, {
    transform: 'translateX(0)',
  }], {
    duration: 200, // Reduced duration for faster animation
    fill: 'both',
    easing: 'linear', // Changed easing to 'linear'
  });
}

rotateText();


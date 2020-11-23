import { Timeline, Animation } from './animation';
import { ease } from './ease';

let tl = new Timeline();

tl.start();
tl.add(
  new Animation(
    document.querySelector('#el').style,
    'transform',
    0,
    500,
    2000,
    1000,
    ease,
    v => `translateX(${v}px)`
  )
);

document.querySelector('#el2').style.transition = 'transform ease 2s 1s';
document.querySelector('#el2').style.transform = 'translateX(500px)';

document
  .querySelector('#pause-btn')
  .addEventListener('click', () => tl.pause());
document
  .querySelector('#resume-btn')
  .addEventListener('click', () => tl.resume());
document
  .querySelector('#reset-btn')
  .addEventListener('click', () => tl.reset());

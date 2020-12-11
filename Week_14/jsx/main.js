import { createElement } from './framework';
import { Carousel } from './carousel';
import { Timeline, Animation } from './animation';
import { enableGesture } from './gesture';

let d = [
  'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
  'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
  'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
  'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
];

let a = <Carousel id='ass' src={d}></Carousel>;
a.mountTo(document.body);

let tl = new Timeline();
window.tl = tl;
window.animation = new Animation(
  {
    set a(v) {
      console.log(v);
    },
  },
  'a',
  0,
  100,
  1000,
  null
);
// tl.add(new Animation({}, 'a', 0, 100, 1000, null));
tl.start();

enableGesture(document.documentElement);
document.documentElement.addEventListener('tap', () => {
  console.log('tap ');
});

document.documentElement.addEventListener('press', () => {
  console.log('press');
});

document.documentElement.addEventListener('panstart', () => {
  console.log('panstart');
});

document.documentElement.addEventListener('pan', () => {
  console.log('pan');
});

document.documentElement.addEventListener('panend', () => {
  console.log('panend');
});

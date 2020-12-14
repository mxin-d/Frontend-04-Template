import { Component, STATE, ATTRIBUTE } from './framework';
import { enableGesture } from './gesture';
import { Timeline, Animation } from './animation';
import { ease } from './ease';
export { STATE, ATTRIBUTE } from './framework';

export class Carousel extends Component {
  constructor() {
    super();
  }
  render() {
    this.root = document.createElement('div');
    this.root.classList.add('carousel');
    for (const record of this[ATTRIBUTE].src) {
      let child = document.createElement('div');
      child.style.backgroundImage = `url(${record})`;
      this.root.appendChild(child);
    }
    enableGesture(this.root);
    let timeline = new Timeline();
    timeline.start();

    let handler = null;

    let children = this.root.children;
    this[STATE].position = 0;

    let t = 0;
    let ax = 0;

    this.root.addEventListener('start', event => {
      timeline.pause();
      clearInterval(handler);
      if (Date.now() - t < 500) {
        let progress = (Date.now() - t) / 500;
        ax = ease(progress) * 571 - 571;
      } else {
        ax = 0;
      }
    });

    this.root.addEventListener('pan', event => {
      let x = event.clientX - event.startX - ax;
      let current = this[STATE].position - (x - (x % 571)) / 571;
      for (let offset of [-1, 0, 1]) {
        let pos = current + offset;

        // 计算当前位置
        pos = parseInt(
          ((pos % children.length) + children.length) % children.length
        );
        children[pos].style.transition = 'none';
        children[pos].style.transform = `translateX(${
          -pos * 571 + offset * 571 + (x % 571)
        }px)`;
      }
    });

    this.root.addEventListener('panend', event => {
      timeline.reset();
      timeline.start();

      let x = event.clientX - event.startX - ax;
      let current = this[STATE].position - (x - (x % 571)) / 571;

      let direction = Math.round((x % 571) / 571);

      for (const offset of [-1, 0, 1]) {
        let pos = current + offset;
        // 计算当前位置
        pos = parseInt(
          ((pos % children.length) + children.length) % children.length
        );
        children[pos].style.transition = 'none';

        timeline.add(
          new Animation(
            children[pos].style,
            'transform',
            -pos * 571 + offset * 571 + (x % 571),
            -pos * 571 + offset * 571 + direction * 571,
            500,
            0,
            ease,
            v => `translateX(${v}px)`
          )
        );
      }
      this[STATE].position =
        this[STATE].position - (x - (x % 571)) / 571 - direction;

      this[STATE].position =
        ((this[STATE].position % children.length) + children.length) %
        children.length;
    });

    let nextPicture = () => {
      let children = this.root.children;
      let nextIndex = (this[STATE].position + 1) % children.length;

      let current = children[this[STATE].position];
      let next = children[nextIndex];

      t = Date.now();

      timeline.add(
        new Animation(
          current.style,
          'transform',
          -this[STATE].position * 571,
          -571 - this[STATE].position * 571,
          500,
          0,
          ease,
          v => `translateX(${v}px)`
        )
      );

      timeline.add(
        new Animation(
          next.style,
          'transform',
          571 - nextIndex * 571,
          -nextIndex * 571,
          500,
          0,
          ease,
          v => `translateX(${v}px)`
        )
      );

      this[STATE].position = nextIndex;
    };

    handler = setInterval(nextPicture, 2000);

    return this.root;
  }
}

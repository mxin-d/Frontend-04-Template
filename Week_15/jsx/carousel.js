import { Component } from './framework';
import { enableGesture } from './gesture';
import { Timeline, Animation } from './animation';
import { ease } from './ease';

export class Carousel extends Component {
  constructor() {
    super();
    this.attributes = Object.create(null);
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  render() {
    this.root = document.createElement('div');
    this.root.classList.add('carousel');
    for (const record of this.attributes.src) {
      let child = document.createElement('div');
      child.style.backgroundImage = `url(${record})`;
      this.root.appendChild(child);
    }
    enableGesture(this.root);
    let timeline = new Timeline();
    timeline.start();

    let handler = null;

    let children = this.root.children;
    let position = 0;

    let t = 0;
    let ax = 0;

    this.root.addEventListener('start', event => {
      timeline.pause();
      clearInterval(handler);
      let progress = (Date.now() - t) / 500;
      ax = ease(progress) * 571 - 571;
    });

    this.root.addEventListener('pan', event => {
      let x = event.clientX - event.startX - ax;
      let current = position - (x - (x % 571)) / 571;
      for (const offset of [-1, 0, 1]) {
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
      let current = position - (x - (x % 571)) / 571;

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

        position = position - (x - (x % 571)) / 571 - direction;
        position =
          ((position % children.length) + children.length) % children.length;
      }
    });

    let nextPicture = () => {
      let children = this.root.children;
      let nextIndex = (position + 1) % children.length;

      let current = children[position];
      let next = children[nextIndex];

      t = Date.now();

      timeline.add(
        new Animation(
          current.style,
          'transform',
          -position * 571,
          -571 - position * 571,
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

      position = nextIndex;
    };

    handler = setInterval(nextPicture, 2000);

    // this.root.addEventListener('mousedown', event => {
    //   let startX = event.clientX;
    //   let children = this.root.children;

    //   let move = event => {
    //     let x = event.clientX - startX;
    //     let current = position - Math.round((x - (x % 571)) / 571);
    //     for (const offset of [-1, 0, 1]) {
    //       let pos = current + offset;
    //       // 计算当前位置
    //       pos = (pos + children.length) % children.length;
    //       children[pos].style.transition = 'none';
    //       children[pos].style.transform = `translateX(${
    //         -pos * 571 + offset * 571 + (x % 571)
    //       }px)`;
    //     }
    //   };
    //   let up = event => {
    //     let x = event.clientX - startX;
    //     position = position - Math.round(x / 571);
    //     for (const offset of [
    //       0,
    //       -Math.sign(Math.round(x / 571) - x + 285.5 * Math.sign(x)),
    //     ]) {
    //       let pos = position + offset;
    //       pos = (pos + children.length) % children.length;
    //       children[pos].style.transition = '';
    //       children[pos].style.transform = `translateX(${
    //         -pos * 571 + offset * 571
    //       }px)`;
    //     }
    //     document.removeEventListener('mousemove', move);
    //     document.removeEventListener('mouseup', up);
    //   };

    //   document.addEventListener('mousemove', move);
    //   document.addEventListener('mouseup', up);
    // });

    // let currentIndex = 0;
    // setInterval(() => {
    //   let children = this.root.children;
    //   let nextIndex = (currentIndex + 1) % children.length;

    //   let current = children[currentIndex];
    //   let next = children[nextIndex];

    //   next.style.transition = 'none';
    //   next.style.transform = `translateX(${100 - nextIndex * 100}%)`;

    //   setTimeout(() => {
    //     next.style.transition = '';
    //     current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
    //     next.style.transform = `translateX(${-nextIndex * 100}%)`;
    //     console.log(currentIndex, nextIndex);

    //     currentIndex = nextIndex;
    //   }, 16);
    // }, 2000);
    return this.root;
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}

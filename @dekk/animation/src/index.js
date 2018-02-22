import {css} from 'styled-components'

export const slide = {
  normal: css`
    transform: translate3d(
      calc(
        100% * var(--direction, -1) * (var(--regulator, 0) - var(--time, 1))
      ),
      0,
      0
    );
  `,
  reverse: css`
    transform: translate3d(
      calc(
        100% * var(--direction, -1) * (var(--regulator, 0) - var(--time, 1)) * -1
      ),
      0,
      0
    );
  `,
  down: css`
    transform: translate3d(
      0,
      calc(
        100% * var(--direction, -1) * (var(--regulator, 0) - var(--time, 1)) * -1
      ),
      0
    );
  `,
  up: css`
    transform: translate3d(
      0,
      calc(
        100% * var(--direction, -1) * (var(--regulator, 0) - var(--time, 1))
      ),
      0
    );
  `
}

export const fade = {
  in: css`
    opacity: calc(1 - var(--time));
  `,
  out: css`
    opacity: var(--time);
  `
}

export const fadeSlide = {
  in: {
    normal: css`
      --direction: 1;
      --regulator: 0;
      ${fade.in};
      ${slide.normal};
    `,
    reverse: css`
      --direction: 1;
      --regulator: 0;
      ${fade.in};
      ${slide.reverse};
    `,
    up: css`
      ${fade.in};
      ${slide.up};
    `,
    down: css`
      ${fade.in};
      ${slide.down};
    `
  },
  out: {
    normal: css`
      --direction: 1;
      --regulator: 1;
      ${fade.out};
      ${slide.normal};
    `,
    reverse: css`
      --direction: 1;
      --regulator: 1;
      ${fade.out};
      ${slide.reverse};
    `,
    up: css`
      --direction: -1;
      --regulator: 1;
      ${fade.out};
      ${slide.up};
    `,
    down: css`
      --direction: -1;
      --regulator: 1;
      ${fade.out};
      ${slide.down};
    `
  }
}

export const cube = {
  slideX: css`
    backface-visibility: hidden;
    transform: perspective(200vw) translate3d(0, 0, -50vw)
      rotate3d(0, 1, 0, calc(90deg * var(--direction, -1) * var(--time, 1)))
      translate3d(0, 0, 50vw);
  `,
  slideY: css`
    backface-visibility: hidden;
    transform: perspective(200vh) translate3d(0, 0, -50vh)
      rotate3d(1, 0, 0, calc(90deg * var(--direction, -1) * var(--time, 1)))
      translate3d(0, 0, 50vh);
  `,
  slideInvertX: css`
    backface-visibility: hidden;
    transform: perspective(200vw) translate3d(0, 0, 50vw)
      rotate3d(0, 1, 0, calc(-90deg * var(--direction, -1) * var(--time, 1)))
      translate3d(0, 0, -50vw);
  `,
  slideInvertY: css`
    backface-visibility: hidden;
    transform: perspective(200vh) translate3d(0, 0, 50vh)
      rotate3d(1, 0, 0, calc(-90deg * var(--direction, -1) * var(--time, 1)))
      translate3d(0, 0, -50vh);
  `
}

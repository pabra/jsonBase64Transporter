import { base64Symbol as b64Symbol } from '../src/common/base64';

export const cases: Record<
  'fromArrayBufferTimmed' | 'fromArrayBufferNotTimmed' | 'toArrayBuffer',
  Record<'good' | 'bad', [any, any][]>
> = {
  fromArrayBufferTimmed: {
    good: [
      [new Uint8Array([2, 4, 8, 16, 32, 64, 128, 255]), 'AgQIECBAgP8'],
      [new Uint8Array([42, 119, 246, 13, 63, 213, 158]), 'Knf2DT/Vng'],
    ],
    bad: [[Infinity, undefined]],
  },

  fromArrayBufferNotTimmed: {
    good: [
      [new Uint8Array([2, 4, 8, 16, 32, 64, 128, 255]), 'AgQIECBAgP8='],
      [new Uint8Array([42, 119, 246, 13, 63, 213, 158]), 'Knf2DT/Vng=='],
    ],
    bad: [],
  },

  toArrayBuffer: {
    good: [
      [
        [b64Symbol, 'Knf2DT/Vng=='],
        [42, 119, 246, 13, 63, 213, 158],
      ],
      [
        [42, 'Knf2DT/Vng=='],
        [42, 119, 246, 13, 63, 213, 158],
      ],
      [
        [b64Symbol, 'Knf2DT/Vng'],
        [42, 119, 246, 13, 63, 213, 158],
      ],
      [
        [b64Symbol, 'Knf2DT/Vng'],
        [42, 119, 246, 13, 63, 213, 158],
      ],
      [
        [b64Symbol, 'AgQIECBAgP8='],
        [2, 4, 8, 16, 32, 64, 128, 255],
      ],
      [
        [b64Symbol, 'AgQIECBAgP8'],
        [2, 4, 8, 16, 32, 64, 128, 255],
      ],
    ],
    bad: [[Infinity, undefined]],
  },
};

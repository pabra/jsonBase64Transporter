import { expectType } from 'tsd';
import { base64 } from '../browser/index';
import type { Base64, Base64Error } from '../common/base64';

expectType<Base64 | Base64Error>(base64.fromArrayBuffer(new Uint8Array([42])));

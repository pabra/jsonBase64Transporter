import { expectType } from 'tsd';
import { base64 } from '../browser/index';
import type { Base64 } from '../common/base64';

expectType<Base64>(base64.fromArrayBuffer(new Uint8Array([42])));

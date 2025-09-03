/**
 * provide polyfils for msw, since Jest is using a web environment but 'msw' expects a Node environment
 */
import { TextEncoder, TextDecoder } from 'util';
import { TransformStream } from 'stream/web';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.TransformStream = TransformStream;

// A simple mock for the BroadcastChannel API.
class MockBroadcastChannel {
  constructor(name) {
    this.name = name;
  }
  postMessage() {}
  close() {}
}

global.BroadcastChannel = MockBroadcastChannel;
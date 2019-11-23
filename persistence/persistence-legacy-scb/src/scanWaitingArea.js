const EventEmitter = require('events');

class ScanEventEmitter extends EventEmitter {}

const scanEventEmitter = new ScanEventEmitter();

async function waitForScan({ legacyId, newId }) {
  return new Promise((resolve, reject) => {
    scanEventEmitter.once('completed', ({ findings }) => {
      resolve({ legacyId, newId, findings });
    });
  });
}

async function completeScan({ id, findings }) {
  scanEventEmitter.emit('completed', { id, findings });
}

module.exports.waitForScan = waitForScan;
module.exports.completeScan = completeScan;

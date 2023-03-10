const {getPartitionKeyFromData} = require('./utils')
const {TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH} = require('./config')

exports.deterministicPartitionKey = (event) => {

  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = getPartitionKeyFromData(data);
    }
  }

  if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = getPartitionKeyFromData(candidate);
  }
  return candidate;
};

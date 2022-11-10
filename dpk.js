const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      if (event.partitionKey.length > MAX_PARTITION_KEY_LENGTH)
        candidate = crypto.createHash("sha3-512").update(event.partitionKey).digest("hex");
      else
        candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  return candidate;
};
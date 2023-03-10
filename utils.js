const crypto = require("crypto");

exports.getPartitionKeyFromData = (data, algorithm = "sha3-512") => {
  return crypto.createHash(algorithm).update(data).digest("hex");
}

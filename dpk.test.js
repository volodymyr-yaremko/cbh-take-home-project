const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal 'abc' when event has partitionKey value as 'abc'", () => {
    const event = { partitionKey: "abc" };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("abc");
  });

  it("Returns the hash value when event hasn't got partitionKey", () => {
    const event = { key1: "value1", key2: "value2" };
    const trivialKey = deterministicPartitionKey(event);

    const data = JSON.stringify(event);
    const candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    expect(trivialKey).toBe(candidate);
  });

  it("Returns the hash value when partitionKey value length is greater than MAX_LENGTH", () => {
    const event = { key1: "value1", partitionKey: "value2sjdkfjskldjfklsjdfklsjkdlfjklsdjkfljskdlfjklsdjfklsjdklfjskdlfjksldjfklsdjfklsjdklfjskdlfvalue2sjdkfjskldjfklsjdfklsjkdlfjklsdjkfljskdlfjklsdjfklsjdklfjskdlfjksldjfklsdjfklsjdklfjskdlfvalue2sjdkfjskldjfklsjdfklsjkdlfjklsdjkfljskdlfjklsdjfklsjdklfjskdlfjksldjfklsdjfklsjdklfjskdlfvalue2sjdkfjskldjfklsjdfklsjkdlfjklsdjkfljskdlfjklsdjfklsjdklfjskdlfjksldjfklsdjfklsjdklfjskdlf" };
    const trivialKey = deterministicPartitionKey(event);

    const candidate = crypto.createHash("sha3-512").update(event.partitionKey).digest("hex");
    expect(trivialKey).toBe(candidate);
  });
});

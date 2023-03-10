const {generateDeterministicPartitionKey} = require("./dpk");
const {getPartitionKeyFromData} = require("./utils");
const {TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH} = require('./config');
jest.mock('./utils')

let jestPartitionKey = "jest-partition-key";
const mockEvent = {data: {requestId: "dummy"}}
describe("deterministicPartitionKey", () => {
    beforeAll(() => {
        getPartitionKeyFromData.mockImplementation(() => jestPartitionKey)
    })
    it("Returns the literal '0' when given no input", () => {
        const trivialKey = generateDeterministicPartitionKey();
        expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
    });

    it(`Given an event is provided,
        and event does not contains partitionKey,
         Then event's partition generated using getPartitionKeyFromData`, () => {
        const ans = generateDeterministicPartitionKey(mockEvent)
        expect(ans).toBe(jestPartitionKey)
    });

    it(`Given an event is provided,
        and event contains partitionKey,
         Then event's partition key should be returned`, () => {
        const validmockEvent = {partitionKey: "test-partition-key", otherData: {field: "empty"}}
        const ans = generateDeterministicPartitionKey(validmockEvent)
        expect(ans).toBe(validmockEvent.partitionKey)
    });


    it("Given candidate type is not string, then should stringify", () => {
        const mockEvent = {partitionKey: {payload: "dummy-partition-key"}}
        const result = generateDeterministicPartitionKey(mockEvent)
        expect(result).toBe(JSON.stringify(mockEvent.partitionKey))
    });
    it(`Given candidate's length is greater than MAX_PARTITION_KEY_LENGTH, 
      then Should generate partition Key`, () => {
        const mockEvent = {partitionKey: (new Array(2 * MAX_PARTITION_KEY_LENGTH)).join("char")}
        const ans = generateDeterministicPartitionKey(mockEvent)
        expect(ans).toBe(jestPartitionKey)
        expect(getPartitionKeyFromData).toHaveBeenCalledWith(mockEvent.partitionKey)
    });
});

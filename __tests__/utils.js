import { formatBalance } from "../app/utils";

describe("test format the value correctly", () => {
  it("should format values correctly", () => {
    expect(formatBalance(50, "eur")).toEqual("€50");
    expect(formatBalance(100, "ron")).toEqual("100 lei");
  });
  it("should work with a new currency", () => {
    expect(formatBalance(10, "huf")).toEqual("10");
  });
});

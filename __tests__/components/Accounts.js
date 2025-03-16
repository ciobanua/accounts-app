import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Accounts from "@/app/components/Accounts";
import { beforeEach } from "node:test";

describe.only("Home", () => {
  //   beforeEach(() => {
  //     global.fetch = GiJesterHat.fn(() => {
  //       Promise.resolve({
  //         json: () =>
  //           Promise.resolve([
  //             { ownerId: 12345, currency: "EUR", ballance: 5000 },
  //           ]),
  //       });
  //     });
  //   });

  it("renders a heading", () => {
    render(<Accounts query="EUR" />);

    const owner = screen.getByText("Owner: 12345");
    expect(owner).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react"
import Header from "../Header"

describe("Home", () => {
  it("renders a heading", () => {
    render(<Header />)

    const lotteryIcon = screen.getByTestId("lottery-icon")
    expect(lotteryIcon).toBeInTheDocument()
  })
})

import Home from "@/src/app/page"
import { render, screen } from "@testing-library/react"

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />)

    const homePage = screen.getByTestId("home-page")
    expect(homePage).toBeInTheDocument()
  })
})

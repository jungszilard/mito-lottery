import Home from "@/src/app/page"
import { render, screen } from "@testing-library/react"

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />)

    const vercelLogo = screen.getByTestId("vercel-logo")
    const getStarted = screen.getByTestId("get-started")

    expect(vercelLogo).toBeInTheDocument()
    expect(getStarted).toBeInTheDocument()
  })
})

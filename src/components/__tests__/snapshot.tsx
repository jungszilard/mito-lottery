import { render } from "@testing-library/react"
import Header from "../Header"

it("renders homepage unchanged", () => {
  const { container } = render(<Header />)
  expect(container).toMatchSnapshot()
})

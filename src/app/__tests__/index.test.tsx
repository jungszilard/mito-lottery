import Home from "@/src/app/page"
import { store } from "@/src/redux/store"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"

describe("Home", () => {
  it("renders a heading", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )

    const homePage = screen.getByTestId("home-page")
    expect(homePage).toBeInTheDocument()
  })
})

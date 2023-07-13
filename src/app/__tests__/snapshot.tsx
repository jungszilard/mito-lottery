import Home from "@/src/app/page"
import { store } from "@/src/redux/store"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"

it("renders homepage unchanged", () => {
  const { container } = render(
    <Provider store={store}>
      <Home />
    </Provider>
  )
  expect(container).toMatchSnapshot()
})

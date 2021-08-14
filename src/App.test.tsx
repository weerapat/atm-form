import React from "react"
import { screen } from "@testing-library/react"
import { render } from "./test-utils"
import { App } from "./App"

test("renders atm form", () => {
  render(<App />)
  const pinLabel = screen.getByText(/Pin/i)
  expect(pinLabel).toBeInTheDocument()
})

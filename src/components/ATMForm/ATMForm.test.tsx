import React from "react"
import { screen } from "@testing-library/react"
import { render } from "../../test-utils"
import ATMForm from "./ATMForm"

test("renders atm form", () => {
  render(<ATMForm />)
  const pinLabel = screen.getByText(/Pin/i)
  expect(pinLabel).toBeInTheDocument()
})

import React from "react"
import { screen } from "@testing-library/react"
import { render } from "../../test-utils"
import userEvent from '@testing-library/user-event'
import ATMForm from "./ATMForm"

describe('ATMForm', () => {
  it("renders ATM form with Pin input", () => {
    render(<ATMForm/>)
    const pinLabel = screen.getByText(/Pin/i)
    expect(pinLabel).toBeInTheDocument()
  })

  it("notifies if login failed", async () => {
    const { getByLabelText, getByRole, findByText } = render(<ATMForm/>)

    await userEvent.type(getByLabelText(/Pin/i), '0231')
    userEvent.click(getByRole('button', {name: /submit/i}))

    expect(await findByText('Login failed.')).toBeInTheDocument()
  })

  it("allows a user to log in", async () => {
    const { getByLabelText, getByRole, findByText } = render(<ATMForm/>)

    await userEvent.type(getByLabelText(/Pin/i), '1234')
    userEvent.click(getByRole('button', {name: /submit/i}))

    expect(await findByText(/Available balance: £220/i)).toBeVisible()

    userEvent.click(getByRole('button', {name: /withdraw/i}))
    expect(await findByText(/Available balance: £220/i)).toBeVisible()
  })

  it("allows a user to withdraw money", async () => {
    const { getByLabelText, getByRole, findByText } = render(<ATMForm/>)

    await userEvent.type(getByLabelText(/Pin/i), '1234')
    userEvent.click(getByRole('button', {name: /submit/i}))
    expect(await findByText(/Available balance: £220/i)).toBeVisible()

    await userEvent.type(getByLabelText(/Amount/i), '140')

    userEvent.click(getByRole('button', {name: /withdraw/i}))
    expect(await findByText(/Available balance: £80/i)).toBeVisible()

    await userEvent.type(getByLabelText(/Amount/i), '50')

    userEvent.click(getByRole('button', {name: /withdraw/i}))
    expect(await findByText(/Available balance: £30/i)).toBeVisible()

    await userEvent.type(getByLabelText(/Amount/i), '90')

    userEvent.click(getByRole('button', {name: /withdraw/i}))
    expect(await findByText(/Available balance: £-60/i)).toBeVisible()
  })

  it("notifies if withdrawal failed", async () => {
    const { getByLabelText, getByRole, findByText } = render(<ATMForm/>)

    await userEvent.type(getByLabelText(/Pin/i), '1234')
    userEvent.click(getByRole('button', {name: /submit/i}))
    expect(await findByText(/Available balance: £220/i)).toBeVisible()

    await userEvent.type(getByLabelText(/Amount/i), '400')
    userEvent.click(getByRole('button', {name: /withdraw/i}))

    expect(await findByText('Exceeding the available balance')).toBeInTheDocument()

    await userEvent.type(getByLabelText(/Amount/i), '256')
    userEvent.click(getByRole('button', {name: /withdraw/i}))

    expect(await findByText('ATM doesn\'t have enough notes, please try again with tens digits')).toBeInTheDocument()
  })
})

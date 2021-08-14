import { rest } from 'msw'
import { pinAPIUrl } from "../api/LoginAPI";

interface LoginBody {
  pin: string
}
interface LoginResponse {
  currentBalance: number
}

export const handlers = [
  rest.post<LoginBody, LoginResponse | { errorMessage: string }>(pinAPIUrl, (req, res, ctx) => {
    const { pin } = req.body

    if (pin === '1234') {
      return res(
        ctx.json({
          pin,
          currentBalance: 220,
        })
      )}

    // If not authenticated, respond with a 403 error
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: 'Not authorized',
      }),
    )
  }),
]

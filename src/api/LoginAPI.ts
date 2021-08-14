import axios from "axios";

export const pinAPIUrl = 'https://frontend-challenge.screencloud-michael.now.sh/api/pin/';

export default class LoginAPI {
  login(pin: number) {
    return axios.post(pinAPIUrl, { pin })
      .then(({data: {currentBalance}}) => currentBalance);
  }
}

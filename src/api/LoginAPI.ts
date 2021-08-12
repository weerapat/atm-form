import axios from "axios";

export default class LoginAPI {
  login(pin: number) {
    return axios.post('https://frontend-challenge.screencloud-michael.now.sh/api/pin/', { pin })
      .then(({data: {currentBalance}}) => currentBalance);
  }
}

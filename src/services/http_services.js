import axios from "axios";
import state from '@/store/index';
import { token } from "./auth_services";
export function http() {
    return axios.create({
      baseURL:state.state.ApiURL,
      headers:{
        'Authorization':'Bearer ' + token()
      }
    });
}

export function httpFile() {
    return axios.create({
      baseURL:state.state.ApiURL,
      headers:{
        'Content-Type':'multipart/form-data',
        'Authorization':'Bearer ' + token()
      }
    });
}
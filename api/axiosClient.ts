import axios, { AxiosInstance } from "axios";

import { assign } from "lodash";
import Cookie from "js-cookie";

console.log("--->", Cookie.get("authjs.session-token"));
class AxiosClient {
  axiosClient: AxiosInstance;
  accessToken: string =
    Cookie.get("authjs.session-token") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInVuaXF1ZV9uYW1lIjoiYWRtaW4iLCJyb2xlIjpbIlNBTEVTTUFOIiwiVVNFUiJdLCJhdmF0YXIiOiJodHRwczovL2ltYWdlcy5wZXhlbHMuY29tL3Bob3Rvcy85MTgwNzE3L3BleGVscy1waG90by05MTgwNzE3LmpwZWc_YXV0bz1jb21wcmVzcyZjcz10aW55c3JnYiZ3PTgwMCIsInVzZXJUeXBlIjoiU0FMRVNNQU4iLCJuYmYiOjE3MDk1Mzg1NzksImV4cCI6MTcxMDE0MzM3OSwiaWF0IjoxNzA5NTM4NTc5fQ.n62xYMyIWAeBcNlTBP48l0en7tRcy4q1EhT5HJjJPPw";
  constructor() {
    this.axiosClient = axios.create({
      baseURL: process.env.API_URL || "http://localhost:8099/api",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  setHeader = async (userToken = null) => {
    this.axiosClient.defaults.headers.Authorization = `Bearer ${userToken}`;
  };

  get = async (resource: string, config = {}) => {
    return this.axiosClient.get(resource, {
      ...assign(config, { headers: this.axiosClient.defaults.headers as any }),
    });
  };

  post = async (resource: string, data: any, config = {}) =>
    this.axiosClient.post(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers as any)
    );
}

export const axiosInstance = new AxiosClient();

export default AxiosClient;

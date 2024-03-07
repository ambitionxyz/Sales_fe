import { AxiosBuilder } from "./axiosBuilder";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
// import appConfig from '@/common/configs/appConfig'
// import appRouter from "@/common/configs/appRouter";

const axiosBuilder = new AxiosBuilder()
  .setBaseUrl(process.env.NEXT_PUBLIC_BASE_API)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .addInterceptor(async (config: any) => {
    const accessToken = Cookies.get("accessToken") || "";
    const culture = Cookies.get("NEXT_LOCALE") || "vi-VN";

    /**
     * init default params all request
     */
    config.params = {
      culture,
      ...config.params,
    };

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  })
  .setResponseInterceptor(async (response: any) => {
    if (typeof window !== "undefined") {
      // if (response?.data?.error?.code === 400) {
      //   window.location.href = '/400'
      // }

      // if (response?.data?.error?.code === 404) {
      //   window.location.href = '/404'
      // }

      if (response?.data?.error?.code === 500) {
        window.location.href = "/500";
      }

      if (response?.data?.error?.code === 502) {
        window.location.href = "/502";
      }

      if (response?.data?.error?.code === 503) {
        window.location.href = "/503";
      }
    }

    return response;
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .setErrorInterceptor(async (error: any) => {
    // const culture = Cookies.get('NEXT_LOCALE') || 'vi-VN'

    if (process.env.NODE_ENV === "development") {
      console.log("interceptor debug:", error.code);
    }

    if (error?.code === "ERR_BAD_RESPONSE") {
      if (error?.response?.status === 500) {
        throw {
          code: 500,
          message: "GW-500",
        };
      }

      throw {
        code: 502,
        message: "GW-502",
      };
      // throw new Error(
      // appConfig.errorMessage[
      //   culture as keyof typeof appConfig.errorMessage
      // ] ?? (appConfig.errorMessage['vi-VN'] as string)
      // )
    }

    if (error?.response?.status === 401) {
      await signOut({ callbackUrl: "/" });
      Cookies.remove("accessToken");
    }

    if (error?.response?.status === 502) {
      throw { message: "This Failed" };
      // throw new Error(
      //   appConfig.errorMessage[
      //     culture as keyof typeof appConfig.errorMessage
      //   ] ?? (appConfig.errorMessage['vi-VN'] as string)
      // )
    }

    return error;
  })
  .build();

export const httpClient = axiosBuilder;

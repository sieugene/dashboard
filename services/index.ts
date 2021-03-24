import axios, { AxiosInstance, AxiosResponse } from "axios";

export class Api {
  public baseUrl: string;
  public instance: AxiosInstance;

  constructor() {
    this.baseUrl = "http://localhost:3000/api";
    this.instance = axios.create({
      baseURL: this.baseUrl,
    });
  }

  editorsUpdate(data): Promise<AxiosResponse> {
    return this.instance.post("/editors", data, {
      // headers: {
      //   "Content-Type": "application/x-www-form-urlencoded",
      // },
    });
  }

  allEditors(): Promise<AxiosResponse<any>> {
    return this.instance.get<any>("/editors");
  }

  upload(formData: FormData): Promise<AxiosResponse<any>> {
    return this.instance.post<any>("/upload", formData, {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    });
  }
}

export const service = new Api();

import { DragnItemsList } from "./../Utils/countInArray";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Editors } from "../store/types/Editor";

type AllEditorsData = {
  cols: DragnItemsList[] | null;
  editors: Editors | {};
};
type UploadData = {
  link: string;
};

export type AllEditorsResponse = Promise<AxiosResponse<AllEditorsData>>;
export type UploadResponse = Promise<AxiosResponse<UploadData>>;
export class Api {
  public baseUrl: string;
  public instance: AxiosInstance;

  constructor() {
    this.baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : "/api";
    this.instance = axios.create({
      baseURL: this.baseUrl,
    });
  }

  editorsUpdate(data: {
    cols: DragnItemsList[];
    editors: {} | Editors;
  }): Promise<AxiosResponse> {
    return this.instance.post("/editors", data);
  }

  allEditors(): AllEditorsResponse {
    return this.instance.get<AllEditorsData>("/editors");
  }

  upload(formData: FormData): UploadResponse {
    return this.instance.post<UploadData>("/upload", formData, {
      headers: { "content-type": "multipart/form-data" },
    });
  }
}

export const service = new Api();

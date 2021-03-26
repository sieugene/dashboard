import { HYDRATE } from "next-redux-wrapper";
export const HYDRATE_NEXT = HYDRATE;
export type HydrateNextActionType = {
  type: typeof HYDRATE_NEXT;
  payload: any;
};

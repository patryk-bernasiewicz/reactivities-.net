import axios, { AxiosResponse } from "axios";

import { Activity } from "../models/activity";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T = object>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T = object>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T = object>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T = object>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  delete: <T = void>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<Activity[]>("/activities"),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) =>
    requests.post<Activity>("/activities", activity),
  update: (activity: Activity) =>
    requests.put<Activity>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;

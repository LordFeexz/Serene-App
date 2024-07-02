import axios, { AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";

export const getMood = async () => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/api/v1/mood/",
    });
    return data;
  } catch (error) {
    console.log(error, "<~");
  }
};

export const getTodaysMood = async (date: string) => {
  try {
    const { data } = await axios({
      url: axiosInstance.getUri() + "/api/v1/mood/" + date,
    });
    return data;
  } catch (error) {
    console.log(error, "<~");
    return { data: null };
  }
};

type PostMoodPayload = {
  mood_name: string;
  date: Date;
};

export const getMyMoods = async () => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/api/v1/mood/me",
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error, "<~");
  }
};
export const postMood = async (payload: PostMoodPayload) => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/api/v1/mood/",
      method: "POST",
      data: payload,
    });
    return data;
  } catch (error) {
    if (error && error instanceof AxiosError) {
      console.log(error?.response?.data);
    }
  }
};

export const getMentalHealth = async () => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/api/v1/test/mental-health",
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
type Questions = {
  question: string;
  answer: boolean;
};

export const postMentalHealth = async (questions: Questions[]) => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/api/v1/test/mental-health",
      method: "POST",
      data: { result: questions },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getHistory = async () => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/api/v1/history/",
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllVideo = async () => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/api/v1/assets/therapy-video",
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const getClinics = async (lat: number, lng: number) => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/api/v1/location/clinic",
      params: {
        lat,
        lng,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

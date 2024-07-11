import { AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";

export const getMood = async () => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/mood/",
    });
    return data;
  } catch (error) {
    if (error && error instanceof AxiosError) {
      console.log(error?.response?.data);
      throw error.response?.data;
    }
    console.log(error, "<~");
  }
};
export const postResendEmail = async (email: string) => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/user/resend-email",
      method: "POST",
      data: { email },
    });
    return data;
  } catch (error) {
    if (error && error instanceof AxiosError) {
      console.log(error?.response?.data);
      throw error.response?.data;
    }
    throw error;
  }
};

export const loginRest = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/user/login",
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    if (error && error instanceof AxiosError) {
      throw error.response?.data;
    }
    console.log(error);
    return error;
  }
};

export const registerRest = async (payload: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/user/register",
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    if (error && error instanceof AxiosError) {
      console.log(error?.response?.data);
      throw error.response?.data;
    }
    return error;
  }
};

export const myDataRest = async () => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/user/",
    });
    return data;
  } catch (error) {
    if (error && error instanceof AxiosError) {
      console.log(error?.response?.data);
      throw error.response?.data;
    }
    return error;
  }
};
export const getTodaysMood = async (date: string) => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/mood/me/" + date,
    });
    return data;
  } catch (error) {
    if (error && error instanceof AxiosError) {
      return { data: null };
    }
    return { data: null };
  }
};

type PostMoodPayload = {
  mood_name: string;
  date: Date;
};

export const getMyMoods = async ({
  year,
  month,
}: {
  year: string;
  month: string;
}) => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/mood/me",
      params: {
        year,
        month,
      },
    });
    return data;
  } catch (error) {
    if (error && error instanceof AxiosError) {
      console.log(error?.response?.data.message);
      throw error.response?.data;
    }
    return error;
  }
};
export const postMood = async (payload: PostMoodPayload) => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/mood/",
      method: "POST",
      data: payload,
    });
    return data;
  } catch (error) {
    if (error && error instanceof AxiosError) {
      console.log(error?.response?.data.message);
      throw error.response?.data.message;
    }
  }
};

export const getMentalHealth = async () => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/test/mental-health",
    });
    return data;
  } catch (error) {
    if (error && error instanceof AxiosError) {
      console.log(error?.response?.data);
      throw error.response?.data;
    }
  }
};
type Questions = {
  question: string;
  answer: boolean;
};

export const postMentalHealth = async (questions: Questions[]) => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/test/mental-health",
      method: "POST",
      data: { result: questions },
    });
    return data;
  } catch (error) {
    if (error && error instanceof AxiosError) {
      console.log(error?.response?.data);
      throw error.response?.data;
    }
    return error;
  }
};

export const getHistory = async () => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/history/",
    });
    return data;
  } catch (error) {
    if (error && error instanceof AxiosError) {
      console.log(error?.response?.data);
      throw error.response?.data;
    }
    return error;
  }
};

export const getAllVideo = async () => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/assets/therapy-video",
    });
    return data;
  } catch (error) {
    if (error && error instanceof AxiosError) {
      console.log(error?.response?.data);
      throw error.response?.data;
    }
    return error;
  }
};

export const getClinics = async (lat: number, lng: number) => {
  try {
    const { data } = await axiosInstance({
      url: axiosInstance.getUri() + "/location/clinic",
      params: {
        lat,
        lng,
      },
    });
    return data;
  } catch (error) {
    if (error && error instanceof AxiosError) {
      console.log(error?.response?.data);
      throw error.response?.data;
    }
    return error;
  }
};

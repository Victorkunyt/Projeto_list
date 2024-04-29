/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */

// import dotenv from 'dotenv';
// dotenv.config();

import axios from "axios";


//var nodeEnv = process.env.REACT_APP_API_PROD_URL; 

const baseurl = "https://projeto-list-git-main-developmentlist.vercel.app"

export const api = axios.create({
  baseURL: baseurl,
});


export const login = async (login: string, password: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.post("/login", { login, password });
    return response.data;
    
  } catch (error) {
    throw error;
  }
  
};



export const register = async (
  gender: string,
  name: string,
  email: string,
  cellphone: string,
  holderid: string,
  password: string
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.post("/register", {
      gender,
      name,
      email,
      cellphone,
      holderid,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refresh = async (refresh_token: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.post("/refreshtoken", { refresh_token });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (userId: unknown,token: unknown) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.get(`/getAlltask?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const category = async (userId: unknown, token: unknown) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.get(`/category?userId=${userId}`, { // Use userId como parte do endpoint
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const registerCategory = async (
  token: unknown,
  nameCategory: string,
  userId: string
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.post(
      "/registerCategory",
      {
        nameCategory,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerTask = async (
  token: unknown,
  nametask: string,
  categoryId: string,
  userId: string
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.post(
      "/registerTask",
      {
        nametask,
        categoryId,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const notifications = async (userId: unknown,token: unknown,) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.get(
      `/getnotification?userId=${userId}`,{
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
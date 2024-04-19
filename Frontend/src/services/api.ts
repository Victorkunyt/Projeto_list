// api.ts
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3333"
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

export const register = async (gender: string,name: string, email: string, cellphone: string,holderid: string, password: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await api.post("/register", { gender,name,email,cellphone,holderid,password });
          return response.data
    } catch (error) {
        throw error;
    }

}

export const refresh = async (refresh_token: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.post("/refreshtoken", { refresh_token });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const category = async (token: unknown) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await api.get("/category", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data
    } catch (error) {
      throw error;
    }
  };

  export const registerCategory = async (token: unknown, nameCategory: string, userId: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await api.post("/registerCategory", {
        nameCategory,
        userId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
        
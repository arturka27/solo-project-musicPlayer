import axios from "axios";

export const axiosRequest = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

let accessToken = "";
export function setAccessToken(token: string) {
  accessToken = token;
}

axiosRequest.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    //запомнили информацию с прошлого запроса
    const prevRequest = error.config;
    //проверяем статус и проверка на первичность запроса
    if (error.response.status === 403 && !prevRequest.sent) {
      //делаем запрос на пару токенов
      const response = await axios.get("/api/tokens/refresh");
      //достаем токен из ответа
      accessToken = response.data.accessToken;
      // и создаем новый ключ и sent для проверки первичности
      prevRequest.sent = true;
      //устанавливаем заголовки
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      //делаем повторный запрос
      return axiosRequest(prevRequest);
    }

    return Promise.reject(error);
  }
);
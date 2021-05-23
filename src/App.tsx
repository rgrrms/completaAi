import React, {useEffect} from 'react';
import Routes from "./routes";
import api from "./services/service";
import {clearStorage, getFromStorage} from "./constants/helpers";
import {STORAGE_KEYS} from "./constants/constantes";
import axios from "axios";

function App() {
  useEffect(() => {
      document.oncontextmenu = function () {
        return false;
      };

      document.onkeydown = function (event) {
        return event.key !== 'F12';
      };

    api.interceptors.request.use(
      async (config) => {
        if (!config.url?.endsWith('social')) {
          const userToken = await getFromStorage(STORAGE_KEYS.TOKEN);
          config.headers.Authorization = `Bearer ${userToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          clearStorage();

          document.location.href = '/auth';

          const requestConfig = error.config;
          return axios(requestConfig);
        }
        return Promise.reject(error);
      },
    );
  }, []);

  return (
    <div>
      <header>
        <Routes />
      </header>
    </div>
  );
}

export default App;

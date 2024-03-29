import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import {RecoilRoot} from "recoil";
import { QueryClient } from "react-query";
import ReactGA from 'react-ga';

const queryClient = new QueryClient();
ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <ReactQueryDevtools initialIsOpen={true} /> 
      <App />
    </RecoilRoot>
  </QueryClientProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

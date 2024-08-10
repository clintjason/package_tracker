import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { Provider } from 'react-redux';
import store from './store';
//import { login } from './reducers/authSlice'; 
import './index.css';

window.addEventListener('message', (event) => {
  if (event.data.type === 'message') {
    console.log("In the event")
    console.log(JSON.parse(event.data.data)); // 'Hello from micro-frontend 1'
    localStorage.setItem('pt_user', event.data.data);
  }
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';

//const currentHostname = location.hostname;
// Load user from storage
const user = JSON.parse(localStorage.getItem('pt_user')) || JSON.parse(sessionStorage.getItem('pt_user'));
if (user) {
  //store.dispatch(login(user));
}

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
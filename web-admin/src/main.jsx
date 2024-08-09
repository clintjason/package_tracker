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

// Load user from storage
/* const user = JSON.parse(localStorage.getItem('pms_user')) || JSON.parse(sessionStorage.getItem('pms_user'));
if (user) {
  store.dispatch(login(user));
} */
/* 
window.addEventListener('storage', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("Received an event")
  if (user) {
      // Update local state or make authenticated API requests
  }
}); */
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
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UsuarioProvider from './components/roles/context/UsuarioProvider';


//redux

import {Provider} from 'react-redux'
import { store } from './components/calendarioPacientes/redux/store/store';


//fin redux

//testeando git solo

//al app se envuelve dentro del usuario provider para que se pueda usar en todos los hijos de la app
ReactDOM.render(
<Provider store={store}>
  {/* <React.StrictMode> */}
    <UsuarioProvider>
    <App />
    </UsuarioProvider>
  {/* </React.StrictMode>,  */}
  </Provider>,

  
  document.getElementById('root')
);


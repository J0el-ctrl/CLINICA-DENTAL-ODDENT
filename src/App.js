import React from 'react';
import {BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  
  }  from "react-router-dom"

  import {UsuarioContext} from './components/roles/context/UsuarioProvider.jsx'

import Navbar from './components/Navbar';
import Contactanos from './components/vistaNavbarUI/Contactanos';
import Home from './components/vistaNavbarUI/Home';
import Login from './components/vistaNavbarUI/Login';
import Publicaciones from './components/vistaNavbarUI/Publicaciones';
import Servicios from './components/vistaNavbarUI/Servicios';
import Staf from './components/vistaNavbarUI/Staf';
import Administrador from './components/vistaNavbarUI/Administrador.jsx';
import MensajeContactos from './components/vistaNavbarUI/MensajeContactos.jsx';
import CreaServicios from './components/vistaNavbarUI/CreaServicios.jsx';
import AfiliadosOBdentPeru from './components/vistaNavbarUI/AfiliadosOBdentPeru.jsx';
import CreateStaf from './components/vistaNavbarUI/CreateStaf.jsx';
import GestionDocumentos from './components/vistaNavbarUI/GestionDocumentos.jsx';
import GestionarPublicaciones from './components/vistaNavbarUI/GestionarPublicaciones.jsx';
import GestionServicioDePagos from './components/vistaNavbarUI/GestionServicioPagos.jsx';
import HistoPagoAfiliados from './components/vistaNavbarUI/HistoPagoAfiliados.jsx';
import CalendarScreen from './components/calendarioPacientes/calendar/CalendarScreen.jsx';

function App() {
  const {usuario} = React.useContext(UsuarioContext)   
  return (
    <Router>
    <div>
     <Navbar/>
    </div>
      <Switch>
      <Route exact path="/">
      <Home/>
      </Route>
      <Route exact path="/publicaciones">
      <Publicaciones/>

      </Route>
      <Route exact path="/contactanos">
      <Contactanos/>
      </Route>
      <Route exact path="/servicios">
      <Servicios/>
      </Route>
      <Route exact path="/staf">
      <Staf/>
      </Route>
      <Route exact path="/login">
      <Login/>
      </Route>

      
      <Route exact path="/mensaje">

      {
        usuario.rol==='admin' && <MensajeContactos/>
      }
      {
        usuario.rol==='doctor' && <MensajeContactos/>
      }
      {
        usuario.rol==='tecnico' && <MensajeContactos/>
      }
      
      {
        usuario.rol==='admin' || usuario.rol==='doctor' || usuario.rol==='tecnico' ? (null):('NO TIENE LOS PERMISOS NECESARIOS PORFAVOR CONTACTE AL ADMINISTRADOR ---  --- ')
      }
      </Route>

      <Route exact path="/crearservicios">
      
      {
        usuario.rol!=='admin'?('no tiene los privilegios necesarios para esta gestion- pongase en contacto con el administrador'):(<CreaServicios/>)
      }
      </Route>

      <Route exact path="/createstaf">
      
      {
        usuario.rol!=='admin'?('no tiene los privilegios necesarios para esta gestion- pongase en contacto con el administrador'):(<CreateStaf/>)
      }
      </Route>


      <Route exact path="/afiliacion">
      

      {
        usuario.rol==='admin' && <AfiliadosOBdentPeru/>
      }
      {
        usuario.rol==='doctor' && <AfiliadosOBdentPeru/>
      }
      {
        usuario.rol==='tecnico' && <AfiliadosOBdentPeru/>
      }
      
      {
        usuario.rol==='admin' || usuario.rol==='doctor' || usuario.rol==='tecnico' ? (null):('NO TIENE LOS PERMISOS NECESARIOS PORFAVOR CONTACTE AL ADMINISTRADOR jojolete ---  --- ')
      }



      </Route>

      <Route exact path="/gestiondocumentos">
      

      {
        usuario.rol==='admin' && <GestionDocumentos/>    
      }
      {
        usuario.rol==='doctor' && <GestionDocumentos/>    
      }
      {
        usuario.rol==='tecnico' && <GestionDocumentos/>    
      }
      
      {
        usuario.rol==='admin' || usuario.rol==='doctor' || usuario.rol==='tecnico' ? (null):('NO TIENE LOS PERMISOS NECESARIOS PORFAVOR CONTACTE AL ADMINISTRADOR jojolete ---  --- ')
      }

      </Route>

      <Route exact path="/crearpublicaciones">
      
      {
        usuario.rol==='admin' || usuario.rol==='doctor'?(<GestionarPublicaciones/>):('No tiene los permisos necesarios')
      }
     
      
      
      </Route>

      <Route exact path="/pagos">

{
  usuario.rol==='admin' && <GestionServicioDePagos/>
}
{
  usuario.rol==='doctor' && <GestionServicioDePagos/>
}
{
  usuario.rol==='tecnico' && <GestionServicioDePagos/>
}

{
  usuario.rol==='admin' || usuario.rol==='doctor' || usuario.rol==='tecnico' ? (null):('NO TIENE LOS PERMISOS NECESARIOS PORFAVOR CONTACTE AL ADMINISTRADOR ---  --- ')
}
</Route>

<Route exact path="/calendario">

      
{
  usuario.rol==='admin' && <CalendarScreen/>
}
{
  usuario.rol==='doctor' && <CalendarScreen/>
}
{
  usuario.rol==='tecnico' && <CalendarScreen/>
}

{
  usuario.rol==='admin' || usuario.rol==='doctor' || usuario.rol==='tecnico' ? (null):('NO TIENE LOS PERMISOS NECESARIOS PORFAVOR CONTACTE AL ADMINISTRADOR jojolete ---  --- ')
}





</Route>


<Route exact path="/histopagoafiliados">

      {
        usuario.rol==='admin' && <HistoPagoAfiliados/>
      }
      {
        usuario.rol==='doctor' && <HistoPagoAfiliados/>
      }
     
      
      
      {
        usuario.rol==='admin' || usuario.rol==='doctor'   ? (null):('NO TIENE LOS PERMISOS NECESARIOS PORFAVOR CONTACTE AL ADMINISTRADOR ---  --- ')
      }
     
      </Route>



        
      <Route exact path="/administrador">
      {
        usuario.rol==='admin' && <Administrador/>
      }
      {
        usuario.rol==='doctor' && <Administrador/>
      }
      {
        usuario.rol==='tecnico' && <Administrador/>
      }

      {
        usuario.rol==='admin' || usuario.rol==='doctor' || usuario.rol==='tecnico' ? (null):('NO TIENE LOS PERMISOS NECESARIOS PORFAVOR CONTACTE AL ADMINISTRADOR ---  --- ')
      }
    
   

      </Route>

      <Redirect to="/" />
      </Switch>
    </Router>
  
  );
} 

export default App;

import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
// agreagmaos la librerias de proptypes
import PropTypes from 'prop-types';

function App() {
  
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
  if(!citasIniciales) { 
    citasIniciales = []
  }


  const [citas, guardarCitas] = useState([]);
  
  useEffect( () => {
    if (citasIniciales) { 
      localStorage.setItem('citas', JSON.stringify(citas))
    } else { 
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas, citasIniciales] );
  


  const crearCita = (nuevaCita) => { 
    guardarCitas([...citas, nuevaCita]); 
  }

  const eliminarCita = (id) => { 
      const nuevasCitas = citas.filter(cita => cita.id !== id);
      guardarCitas(nuevasCitas)

  }

  const titulo = citas.length === 0 ? 'No hay citas pe' : 'Adiministra tus citas'
  
  return (
    <Fragment>
      <h1>Administrador de Pacientes G</h1>
      <div className="container">
        <div className="row">

          <div className="one-half column">
            <Formulario 
              crearCita = {crearCita}
            />
          </div>
          
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita =>(
              <Cita 
                key = {cita.id}  
                cita = {cita}
                eliminarCita = {eliminarCita}
              />
            ))}
          </div>
        
        </div>
      </div>
    </Fragment>
  );
}

// para documentar los componentes
Formulario.propTypes = { 
  // aqa estamos diciendo que crearcite es tna funcion y es requerida
  // si se elemina esto manda un error a consola diciendo que se necesia 
  // la funcion para q ejecute
  crearCita: PropTypes.func.isRequired
}


export default App;

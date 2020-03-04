import React, {Fragment, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';


const Formulario = ({crearCita}) => {
    //states
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha:'', 
        hora:'',
        sintomas:''
    });
    const [ error, actualizarError ] = useState(false);
    
    //funciones 
    const actualizarState = (evento) => { 
        actualizarCita({ 
            ...cita,
            [evento.target.name]: evento.target.value
        })
    }
    
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // enviando datos
    const submitCita = (event) => { 
        event.preventDefault();
        // 1°validacion
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === ''|| hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true)            
            return
        }
        actualizarError(false);

        // 2° asignacion id,
        cita.id = uuidv4();

        // 3° creamos la cita 
        crearCita(cita); 

        // 4°Reinicamos el form
        actualizarCita({ 
            mascota: '',
            propietario: '',
            fecha:'', 
            hora:'',
            sintomas:''
        })

    }
    
    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <p className="alerta-error">Todos los campos son obligarios</p>
            :null }

            <form
                onSubmit = {submitCita} 
            >
                <label>Nombre Mascota</label>
                
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange = {actualizarState}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueño de la mascota"
                    onChange = {actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange = {actualizarState}
                    value={fecha}
                />
                
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange = {actualizarState}
                    value={hora}
                />

                <label>Sintomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    onChange = {actualizarState}
                    value={sintomas}
                ></textarea>
                
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
                
            </form>
        </Fragment>
     );
}
 
export default Formulario;
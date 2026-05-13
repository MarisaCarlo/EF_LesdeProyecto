import { useState } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import {

    FaEnvelope,

    FaLock,

    FaHardHat

} from 'react-icons/fa';



function Login() {

    const navigate = useNavigate();


    const [correo, setCorreo] = useState('');

    const [password, setPassword] = useState('');



    const iniciarSesion = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(

                'http://localhost:4000/api/usuarios/login',

                {
                    correo,
                    password
                }

            );


            alert('Login correcto');

            console.log(res.data);


            // GUARDAR USUARIO

            localStorage.setItem(

                'usuario',

                JSON.stringify(res.data.usuario)

            );


            // REDIRECCIONAR A TAREAS

            navigate('/tareas');

        }

        catch (error) {

            alert('Correo o contraseña incorrectos');

            console.log(error);

        }

    };



    return (

        <div className='container d-flex justify-content-center align-items-center vh-100'>

            <div className='col-md-4'>

                <div className='card-lesde'>


                    <h2 className='titulo-lesde'>

                        <FaHardHat />
                        {' '}
                        Login LESDE

                    </h2>



                    <form onSubmit={iniciarSesion}>


                        <div className='mb-3'>

                            <div className='input-group'>

                                <span className='input-group-text'>

                                    <FaEnvelope />

                                </span>


                                <input
                                    type='email'
                                    placeholder='Correo'
                                    className='form-control input-lesde'
                                    onChange={(e) =>
                                        setCorreo(e.target.value)
                                    }
                                />

                            </div>

                        </div>



                        <div className='mb-4'>

                            <div className='input-group'>

                                <span className='input-group-text'>

                                    <FaLock />

                                </span>


                                <input
                                    type='password'
                                    placeholder='Contraseña'
                                    className='form-control input-lesde'
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                            </div>

                        </div>



                        <button className='btn-lesde w-100 mb-3'>

                            Ingresar

                        </button>

                    </form>



                    <button
                        className='btn-outline-lesde w-100'
                        onClick={() => navigate('/usuarios')}
                    >

                        Registrarse

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Login;
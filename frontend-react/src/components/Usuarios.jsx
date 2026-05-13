import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import {

    
    FaClipboardList,

    FaSignOutAlt,
    
    FaUsers,

    FaEdit,

    FaTrash,

    FaArrowLeft

} from 'react-icons/fa';

function Usuarios() {

    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState([]);

    const [editando, setEditando] = useState(false);

    const [idUsuario, setIdUsuario] = useState('');

    const [form, setForm] = useState({

        nombre: '',
        correo: '',
        password: '',
        cargo: ''

    });



    const obtenerUsuarios = async () => {

        const res = await axios.get(
            'http://localhost:4000/api/usuarios'
        );

        setUsuarios(res.data);

    };



    const eliminarUsuario = async (id) => {

        await axios.delete(

            `http://localhost:4000/api/usuarios/${id}`

        );

        alert('Usuario eliminado');

        obtenerUsuarios();

    }

    const editarUsuario = (usuario) => {

        setEditando(true);

        setIdUsuario(usuario._id);

        setForm({

            nombre: usuario.nombre,
            correo: usuario.correo,
            password: '',
            cargo: usuario.cargo

        });

    }



    useEffect(() => {

        obtenerUsuarios();

    }, []);



    const guardarUsuario = async (e) => {

        e.preventDefault();


        if (editando) {

            await axios.put(

                `http://localhost:4000/api/usuarios/${idUsuario}`,

                form

            );

            alert('Usuario actualizado');

            setEditando(false);

            setIdUsuario('');

        }

        else {

            await axios.post(

                'http://localhost:4000/api/usuarios',

                form

            );

            alert('Usuario registrado');

        }


        setForm({

            nombre: '',
            correo: '',
            password: '',
            cargo: ''

        });


        obtenerUsuarios();

    }



    return (

        <div className='container mt-4'>

            <div className='d-flex justify-content-between mb-4'>

                <h2>
                    <FaUsers />
                    {' '}

                    Gestión de Usuarios LESDE

                </h2>


                <button
                    className='btn btn-secondary'
                    onClick={() => navigate('/')}
                >

                    <FaArrowLeft />
                    {' '}
                    Volver al Login

                </button>

            </div>


            <form onSubmit={guardarUsuario}>

                <input
                    className='form-control mb-2'
                    placeholder='Nombre'
                    value={form.nombre}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            nombre: e.target.value
                        })
                    }
                />

                <input
                    className='form-control mb-2'
                    placeholder='Correo'
                    value={form.correo}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            correo: e.target.value
                        })
                    }
                />

                <input
                    type='password'
                    className='form-control mb-2'
                    placeholder='Contraseña'
                    value={form.password}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password: e.target.value
                        })
                    }
                />

                <input
                    className='form-control mb-3'
                    placeholder='Cargo'
                    value={form.cargo}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            cargo: e.target.value
                        })
                    }
                />

                <button className='btn btn-primary'>

                    {
                        editando
                        ? 'Actualizar Usuario'
                        : 'Registrar Usuario'
                    }

                </button>

            </form>


            <hr />


            <h4>Lista de Usuarios</h4>


            {

                usuarios.map((usuario) => (

                    <div
                        key={usuario._id}
                        className='card p-3 mb-2'
                    >

                        <h5>{usuario.nombre}</h5>

                        <p>{usuario.correo}</p>

                        <p>{usuario.cargo}</p>

                        <div className='d-flex gap-2'>

                            <button
                                className='btn btn-warning'
                                onClick={() => editarUsuario(usuario)}
                            >

                                <FaEdit />
                                {' '}
                                
                                Editar

                            </button>


                            <button
                                className='btn btn-danger'
                                onClick={() => eliminarUsuario(usuario._id)}
                            >
                                <FaTrash />
                                {' '}
                                Eliminar

                            </button>

                        </div>

                    </div>

                ))

            }

        </div>

    )

}

export default Usuarios
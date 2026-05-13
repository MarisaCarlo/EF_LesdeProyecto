import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import {

    FaClipboardList,

    FaSignOutAlt,

    FaEdit,

    FaTrash

} from 'react-icons/fa';

function Tareas() {

    const navigate = useNavigate();

    

    const [tareas, setTareas] = useState([]);

    const [editando, setEditando] = useState(false);

    const [idTarea, setIdTarea] = useState('');


    const [form, setForm] = useState({

        titulo: '',
        descripcion: '',
        area: '',
        responsable: ''

    });

    const cerrarSesion = () => {

        localStorage.removeItem('usuario');

        navigate('/');

    }


    // OBTENER TAREAS

    const obtenerTareas = async () => {

        const res = await axios.get(
            'http://localhost:5000/api/tareas'
        );

        setTareas(res.data);

    };



    useEffect(() => {

        obtenerTareas();

    }, []);



    // GUARDAR TAREA

    const guardarTarea = async (e) => {

        e.preventDefault();

        if (editando) {

            await axios.put(

                `http://localhost:5000/api/tareas/${idTarea}`,

                form

            );

            alert('Tarea actualizada');

            setEditando(false);

            setIdTarea('');

        } else {

            await axios.post(

                'http://localhost:5000/api/tareas',

                form

            );

            alert('Tarea registrada');

        }

        setForm({

            titulo: '',
            descripcion: '',
            area: '',
            responsable: ''

        });

        obtenerTareas();

    };



    // ELIMINAR

    const eliminarTarea = async (id) => {

        await axios.delete(
            `http://localhost:5000/api/tareas/${id}`
        );

        alert('Tarea eliminada');

        obtenerTareas();

    };



    // EDITAR

    const editarTarea = (tarea) => {

        setEditando(true);

        setIdTarea(tarea._id);

        setForm({

            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            area: tarea.area,
            responsable: tarea.responsable

        });

    };



    return (

        <div className='container mt-4'>

            <div className='d-flex justify-content-between align-items-center mb-4'>


               


                <button
                    className='btn btn-dark'
                    onClick={cerrarSesion}
                >
                    <FaSignOutAlt />
                    {' '}
                    Cerrar Sesión

                </button>

            </div>

            <h2 className='mb-4'>
                <FaClipboardList />
                {' '}
                Gestión de Tareas LESDE
            </h2>


            <div className='card p-4 shadow mb-4'>

                <form onSubmit={guardarTarea}>


                    <input
                        className='form-control mb-3'
                        placeholder='Título'
                        value={form.titulo}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                titulo: e.target.value
                            })
                        }
                    />


                    <textarea
                        className='form-control mb-3'
                        placeholder='Descripción'
                        value={form.descripcion}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                descripcion: e.target.value
                            })
                        }
                    />


                    <input
                        className='form-control mb-3'
                        placeholder='Área'
                        value={form.area}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                area: e.target.value
                            })
                        }
                    />


                    <input
                        className='form-control mb-3'
                        placeholder='Responsable'
                        value={form.responsable}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                responsable: e.target.value
                            })
                        }
                    />


                    <button className='btn btn-primary w-100'>

                        {

                            editando
                            ? 'Actualizar Tarea'
                            : 'Registrar Tarea'

                        }

                    </button>

                </form>

            </div>



            <h3 className='mb-3'>
                Lista de Tareas
            </h3>


            {

                tareas.map((tarea) => (

                    <div
                        key={tarea._id}
                        className='card p-3 mb-3 shadow-sm'
                    >

                        <h4>{tarea.titulo}</h4>

                        <p>
                            <strong>Descripción:</strong>
                            {' '}
                            {tarea.descripcion}
                        </p>

                        <p>
                            <strong>Área:</strong>
                            {' '}
                            {tarea.area}
                        </p>

                        <p>
                            <strong>Responsable:</strong>
                            {' '}
                            {tarea.responsable}
                        </p>

                        <p>
                            <strong>Estado:</strong>
                            {' '}
                            {tarea.estado}
                        </p>


                        <div className='d-flex gap-2'>

                            <button
                                className='btn btn-warning'
                                onClick={() =>
                                    editarTarea(tarea)
                                }
                            >
                                <FaEdit />
                                {' '}
                                Editar

                            </button>


                            <button
                                className='btn btn-danger'
                                onClick={() =>
                                    eliminarTarea(tarea._id)
                                }
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

export default Tareas
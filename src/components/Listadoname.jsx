import React, {useState} from 'react'
import uniqid from 'uniqid'

const Listadonombres = () => {

    const [nombre, setNombre] = useState('')
    const [listanombres, setListaNombres] = useState([])
    const [modoEdicio, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)

    const addNombre = (e)=>{
        e.preventDefault()

        if (!nombre.trim()) {
            setError('el campo esta vacio')
            return
        }

        const nuevoNombre = {
            id:uniqid(),
            tituloNombre:nombre
        }
        setListaNombres([...listanombres,nuevoNombre])
        setNombre('')
        setError(null)
    }

    const deleteNombre = (id) =>{
        const nuevaArray = listanombres.filter( item => item.id !== id)
        setListaNombres(nuevaArray)
    }

    const editar = (item) => {
        setModoEdicion(true)
        setNombre(item.tituloNombre)
        setId(item.id)
    }

    const editarNombre = (e) =>{
        e.preventDefault()
        const NuevoArray = listanombres
        .map( item => item.id === id ? {id:id, tituloNombre:nombre} : item)
        setListaNombres(NuevoArray)
        setModoEdicion(false)
        setNombre('')
    }

    return (
        <div>
            <h2>Aplicacion CRUD Formulario</h2>
            <div className="row">
                <div className="col">
                    <h2>Formulario nombres</h2>
                    <ul className="list-group">
                        {
                            listanombres.map ( item => 

                                <li key={item.id} className="list-group-item">{item.tituloNombre}

                                     <button onClick={() => {deleteNombre(item.id)}} className="btn btn-danger float-right">Eliminar</button>

                                     <button onClick={() => {editar(item)}} className="btn btn-info float-right">Editar</button>

                                </li>
                                )
                        }
                    </ul>
                </div>
                <div className="col">
                    <h2>formulario para añadir</h2>
                    <form onSubmit={modoEdicio ? editarNombre : addNombre} className="form-group">

                        <input onChange={(e)=>(setNombre(e.target.value))} className="form-control" type="text" placeholder="introduce nombre" value={nombre}/>

                        <input className="btn btn-info btn-block" type="submit" value={modoEdicio ? 'editar' : 'registrar'}/>
                    </form>

                    {
                        error != null ? (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        ) :
                            (
                                <div></div>
                            )
                    }


                </div>
            </div>
        </div>
    )
}

export default Listadonombres

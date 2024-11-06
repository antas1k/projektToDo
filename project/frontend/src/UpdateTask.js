import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

export function UpdateTask(){
    const[task, setTask] = useState('')
    const[desc, setDesc] = useState('')
    const {id} = useParams()
    const navigate = useNavigate()

    function handleSubmit(event){
        event.preventDefault();
        axios.put("http://localhost:8000/update/"+id, {task, desc})
        .then(res=>{
            //console.log(res)
            navigate('/')
        })
        .catch(err=>console.log(err))
    }
    return<>
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
            <form onSubmit={handleSubmit}>
                <h2>Zaktualizuj zadanie</h2>
                <div className="mb-2">
                    <label htmlFor="">Zadanie</label>
                    <input type="text" placeholder="Wpisz zadanie" className="form-control" onChange={e=>setTask(e.target.value)}></input>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Opis</label>
                    <input type="text" placeholder="Opisz zadanie" className="form-control" onChange={e=>setDesc(e.target.value)}></input>
                </div>
                <button className="btn btn-success">Zaaktualizuj</button>
            </form>
        </div>
    </div>
    </>
}
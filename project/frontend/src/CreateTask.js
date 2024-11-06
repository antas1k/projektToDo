import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export function CreateTask(){
    const[task, setTask] = useState('')
    const[desc, setDesc] = useState('')
    const navigate = useNavigate()

    function handleSubmit(event){
        event.preventDefault();
        axios.post("http://localhost:8000/create", {task, desc})
        .then(res=>{
            console.log(res)
            navigate('/')
        })
        .catch(err=>console.log(err))
    }
    return<>
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
            <form onSubmit={handleSubmit}>
                <h2>Dodaj zadanie</h2>
                <div className="mb-2">
                    <label htmlFor="">Zadanie</label>
                    <input type="text" placeholder="Wpisz zadanie" className="form-control" onChange={e=>setTask(e.target.value)}></input>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Opis</label>
                    <input type="text" placeholder="Opisz zadanie" className="form-control" onChange={e=>setDesc(e.target.value)}></input>
                </div>
                <button className="btn btn-success">Dodaj</button>
            </form>
        </div>
    </div>
    </>
}
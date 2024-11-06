import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom";
import { CreateTask } from "./CreateTask";
export function Task(){
    const[task, setTask] = useState([]);
useEffect(()=>{
    axios.get("http://localhost:8000/")
    .then(res=> setTask(res.data))
    .catch(err=>console.log(err))
},[])


const handleDelete = async (id) =>{
    try{
        await axios.delete("http://localhost:8000/student/"+id)
        window.location.reload()
    }catch(err){
        console.log(err)
    }
}
    return<>
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
            <Link to="/create" className="btn btn-success">DODAJ +</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>ZADANIE</th>
                        <th>OPIS</th>
                        <th>DZIALANIA</th>
                    </tr>
                </thead>
                <tbody>
                {task.map((data, i) => (
                    <tr key={i}>
                        <td>{data.task_name}</td>
                        <td>{data.task_desc}</td>
                        <td>
                            <Link to={`update/${data.task_id}`} className="btn btn-primary">Zaaktualizuj</Link>
                            <button className="btn btn-danger ms-2" onClick={e=>handleDelete(data.task_id)}>Usun</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    </>
}
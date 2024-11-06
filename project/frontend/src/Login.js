import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LoginVal } from "./LoginVal"
import axios from "axios";

export function Login(){
    const navigate = useNavigate()
    const[errors, setErrors] = useState({})
    const[values, setValues] = useState({
        email:'',
        password:''
    })
    const handleSubmit = (event) =>{
        event.preventDefault()
        setErrors(LoginVal(values))

        if(errors.email==="" && errors.password==="")
            {
                axios.post('http://localhost:8000/login', values)
                .then(res=>{
                    if(res.data === "zalogowano")
                        navigate('/home')
                    else
                        alert("Nieprawidlowe dane!")
                })
                .catch(err=>console.log(err))
            }
    }
    const handleInput = (event) =>{
        setValues(prev=>({...prev, [event.target.name]:[event.target.value]}))
    }
    return<>
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Logowanie</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email"><strong>EMAIL</strong></label>
                    <input type="email" name="email" placeholder="Wpisz email" className="form-control" onChange={handleInput}></input>
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password"><strong>HASŁO</strong></label>
                    <input type="password" name="password" placeholder="Wpisz hasło" className="form-control" onChange={handleInput}></input>
                    {errors.password && <span className="text-danger">{errors.password}</span>}
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">Zaloguj sie!</button>
                <br></br>
                <br></br>
                <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Stworz konto</Link>
            </form>
        </div>
    </div>
    </>
}
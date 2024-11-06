import { Link, useNavigate } from "react-router-dom"
import { SignupVal } from "./SignupVal"
import { useState } from "react"
import axios from "axios";
export function Signup(){
    const navigate = useNavigate()
    const[errors, setErrors] = useState({})
    const[values, setValues] = useState({
        name:'',
        email:'',
        password:''
    })
    const handleSubmit = (event) =>{
        event.preventDefault()
        setErrors(SignupVal(values))
        
        if(errors.name==="" && errors.email==="" && errors.password==="")
        {
            axios.post('http://localhost:8000/signup', values)
            .then(res=>{
                navigate('/')
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
            <h2>Rejestracja</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name"><strong>IMIE</strong></label>
                    <input type="text" name="name" placeholder="Wpisz imie" className="form-control" onChange={handleInput}></input>
                    {errors.name && <span className="text-danger">{errors.name}</span>}
                </div>
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
                <button type="submit" className="btn btn-success w-100 rounded-0">Założ konto</button>
                <br></br>
                <br></br>
                <Link to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Mam juz konto</Link>
            </form>
        </div>
    </div>
    </>
}
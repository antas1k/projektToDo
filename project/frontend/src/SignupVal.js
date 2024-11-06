export function SignupVal(values){

    let error ={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/


    if (values.name==="")
        error.name ="Pole imie nie moze byc puste"
    else
        error.name=""


    if (values.email==="")
        error.email ="Eamil nie moze byc pusty"
    else if(!email_pattern.test(values.email))
        error.email = "Email nieprawidlowy"
    else{
        error.email=""
    }
        
    if (values.password==="")
        error.password ="Hasło nie moze byc pusty"
    else if(!password_pattern.test(values.password))
        error.password = "Haslo nieprawidlowe"
    else{
        error.password=""
    }
    return error
}
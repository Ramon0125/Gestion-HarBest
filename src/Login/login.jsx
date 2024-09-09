import React, { useState, useEffect, useRef } from "react";
import { Res, IsntEmpty, Alert, Responses } from "../Components/Components";
import axios from 'axios';
import './LoginStyles.css';
import Logo from './Logo.png';


function Login() 
{
    let [IsLoad,SetIsLoading] = useState(true);

    const HandleStateLoad = () => { SetIsLoading(!IsLoad); }

    useEffect(() => { 
        
        window.addEventListener('load', HandleStateLoad);
    
        return () => {
            window.removeEventListener('load', HandleStateLoad);
        };

    }, []);

    const email = useRef(null);
    const [FocusEmail, SetFocusEmail] = useState(false);

    const pass = useRef(null);
    const [FocusPass, SetFocusPass] = useState(false);
    const [PassType, SetPassType] = useState('password')

    const HandlerBlur = (event) => {  event.target.id === 'email' ? SetFocusEmail(IsntEmpty(email.current.value)) : SetFocusPass(IsntEmpty(pass.current.value)); }
    const HandlerFocus = (event) => { event.target.id === 'email' ? SetFocusEmail(true) : SetFocusPass(true);}
    const HandleCheck = () => { SetPassType(PassType === 'password' ? 'text' : 'password')}

    const SignIn = async (event) => {  event.preventDefault();

        const EmailValue = email.current.value;
        const PassValue = pass.current.value;
        
        if (IsntEmpty(EmailValue, PassValue)) {
            axios
              .post('http://localhost/API-HARBEST/InicioSesion.php', 
                { email: EmailValue, pass: PassValue }, 
                { headers: { 'Content-Type': 'application/json' } }
              )
              .then(({ data }) => {
            
                Responses(data,{...Res,ECI: 'Email o contrasena incorrecta'});

              })
              .catch((err) => { console.log(err); });
          } 
          else { Alert(Res.CTC, Res.W, 2000); }
        
    }

    return (

        <main>
            <div id="carga" className={ IsLoad ? 'loading' : 'hide'}>
                <div className="spin" />
            </div>

            <div id="formWrapper" className="shadow-lg">
                <form id="form">
                    <div className="logo">
                        <img src={Logo} id="im" alt="HarBest Cloud" />
                    </div>

                    <div className="form-item a">
                        <label 
                            htmlFor="email" 
                            className={`formLabel ${FocusEmail ? 'FormTop' : ''}`}>Usuario</label>
                        
                        <input 
                            id='email'
                            ref={email}
                            onFocus={HandlerFocus}
                            onBlur={HandlerBlur}
                            type="email" 
                            className="form-style" 
                            maxLength="50" 
                            autoComplete="email"
                        />
                    </div>
       
                    <div className="form-item">
                        <label 
                            htmlFor="password" 
                            className={`formLabel ${FocusPass ? 'FormTop' : ''}`}>Contraseña</label>

                        <input 
                            id="password" 
                            type={PassType} 
                            ref={pass}
                            onFocus={HandlerFocus}
                            onBlur={HandlerBlur}
                            maxLength="20" 
                            className="form-style" 
                            autoComplete="current-password"
                        />
                    </div>
 
                    <div className="form-check">                       
                        <input 
                            id="Visor" 
                            className="form-check-input" 
                            type="checkbox" 
                            onClick={HandleCheck} 
                        />

                        <label htmlFor="Visor" className="cp"> Mostrar contraseña </label>

                    </div>

                    <div className="form-item">
                        <input 
                            type="submit" 
                            className="login pull-right" 
                            value="Iniciar Sesión" 
                            onClick={SignIn}
                        />    
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Login
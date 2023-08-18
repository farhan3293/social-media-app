import {auth, provider}from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import {useNavigate} from "react-router-dom";
export const Login = ()=>
{
    const navigate = useNavigate(); 
    const SignInWithGoogle = async ()=> // this function is used for sign in
    {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate("/"); // page will be redirected to this url or route home page pe chala jayega
    };
    return(
        <div><p>Sign in with Google To Continue</p>
        <button onClick={SignInWithGoogle}>Sign in with Google</button>
        </div>
    );
};

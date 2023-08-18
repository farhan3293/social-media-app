import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore'; 
/*addDoc is called when we want to add data to firebase, 
collection tells to which collection we want to add data as there are various collections

*/
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useNavigate} from 'react-router-dom';

interface CreateFormData
{
    title:string,
    description: string;

}

export const CreateForm = ()=>
{
    const[user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title : yup.string().required("You must add a title"),
        description : yup.string().required("You must add a description")
    });

    const {register, handleSubmit, formState: {errors}} = useForm <CreateFormData>(
        {
            resolver : yupResolver(schema),
        }
    );

        //here we write to connect to database in firebase
        const postRef = collection(db, "posts");


    const onCreatePost = async(data:CreateFormData) => {
        await addDoc(postRef, {
            title : data.title, //  ...data
            description : data.description,
            username : user?.displayName,
            userId : user?.uid,
        });

        navigate("/"); // we use use navigate so when a post is saved to firebase it should redirect our page back to home page
    };
    return (
        <form onSubmit={handleSubmit(onCreatePost)}>
            <input placeholder='Title' {...register("title")}></input>
            <p style={{color:"red"}}>{errors.title?.message}</p>
            <textarea placeholder='Description' {...register("description")}></textarea>
            <p style={{color:"red"}}>{errors.description?.message}</p>
        
            <input type = "submit" className="submitForm"/>
        </form>
    );

};
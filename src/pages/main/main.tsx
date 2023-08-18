import {getDocs, collection} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface post{
    id:string;
    userId : string;
    title:string;
    username: string;
    description:string;

}
export const Main = ()=>

{
    const[postList, setpostList] = useState<post[] | null>(null); // firestore has array of post
    const postRef = collection(db, "posts");


    const getPosts = async()=>{
        const data = await getDocs(postRef);
        setpostList(data.docs.map((doc)=>({...doc.data(), id: doc.id})) as post[]);
    }; 

    useEffect(()=>
    {
        getPosts();
    }, []);

    return(
        <div>{postList?.map((post) => (<Post post={post}/>))}</div>
    );
};

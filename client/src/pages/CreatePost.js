import { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { Navigate, useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [Content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    async function CreateNewPost(ev){
        
        const data = new FormData();
        data.set('title', title);
        data.set('content', Content)
        data.set('file', files[0]);
        data.set('summary', summary);
        
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
            method:'POST',
            body:data,
            credentials: 'include',
        });
        if(response.ok){
            setRedirect(true);
        }
        else if(!response.ok){
            navigate("/login");
        }

    }

    if(redirect){
        return <Navigate to={'/'} />
    }
    
    return (
        <PostForm title = {title} 
                summary={summary} 
                setFiles={setFiles} 
                content={Content} 
                setContent={setContent} 
                func={CreateNewPost}
                setSummary={setSummary}
                setTitle={setTitle}
                buttonTitle = {"Create Post"}  />
    );
}
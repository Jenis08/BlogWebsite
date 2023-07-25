import { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { Navigate, useNavigate } from "react-router-dom";
import Editor from "../components/Editor";

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

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
        <form>
            <input type='text' placeholder="title" value={title} onChange={ev => setTitle(ev.target.value)}/>
            <input type="text" placeholder="summary" value={summary} onChange={ev => setSummary(ev.target.value)} />
            <input type="file" onChange={ev => setFiles(ev.target.files)} />
            <Editor value={Content} onChange={setContent} />
            <button onClick={CreateNewPost} style={{marginTop: '5px'}} >Create Post</button>
        </form>
    );
}
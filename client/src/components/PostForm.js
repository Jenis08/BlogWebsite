import React from "react";
import Editor from "../components/Editor";

export default function PostForm({title, summary, setFiles, content, setContent, func, setTitle, setSummary, buttonTitle}) {

    return (
        <form onSubmit={func}>
            <input type="title"
                placeholder={'Title'}
                value={title}
                onChange={ev => setTitle(ev.target.value)} />
            <input type="summary"
                placeholder={'Summary'}
                value={summary}
                onChange={ev => setSummary(ev.target.value)} />
            <input type="file"
                onChange={ev => setFiles(ev.target.files)} />
            <Editor onChange={setContent} value={content} />
            <button style={{ marginTop: '5px' }}>{buttonTitle}</button>
        </form>
    );
};
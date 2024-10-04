import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS for Quill editor

const TextEditor = ({ onContentChange }) => {
    const [editorContent, setEditorContent] = useState('');

    const handleChange = (content) => {
        setEditorContent(content);
        onContentChange(content); 
    };

    return (
        <div className='text-editor'>
            <ReactQuill
                value={editorContent}
                onChange={handleChange}
                modules={TextEditor.modules}
                formats={TextEditor.formats}
                placeholder="Start writing..."
            />
        </div>
    );
};

// Define modules for the toolbar
TextEditor.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'color': [] }, { 'background': [] }],          // color and background
        [{ 'align': [] }],
        ['link'],
        ['clean'],                                        // remove formatting button
    ],
};

// Define formats that are allowed in the editor
TextEditor.formats = [
    'header', 'font', 'list', 'bullet',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'align', 'link'
];

export default TextEditor;

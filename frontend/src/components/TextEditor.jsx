import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ onContentChange, initialContent }) => {
    const [editorContent, setEditorContent] = useState(initialContent);

    const handleChange = (content) => {
        setEditorContent(content);
        onContentChange(content); // Call function to update parent state
    };

    // Sync initialContent prop to the editor content when it changes
    useEffect(() => {
        setEditorContent(initialContent);
    }, [initialContent]);

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
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['link'],
        ['clean'],
    ],
};

// Define formats that are allowed in the editor
TextEditor.formats = [
    'header', 'font', 'list', 'bullet',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'align', 'link'
];

export default TextEditor;

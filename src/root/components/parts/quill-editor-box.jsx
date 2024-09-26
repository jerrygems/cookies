import React, {  useState } from 'react'
import QuillEditor from 'react-quill'
import 'react-quill/dist/quill.snow.css';


function QuillEditorBox() {
    const [value, setValue] = useState('')
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['image', 'link', 'video', 'code'],
            [{ 'table': 'true' }],
            [{ 'syntax': 'true' }],
            ['clipboard']
        ]

    }
    const formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video']

    return (
        <QuillEditor
            theme="snow"
            className='TextEditor'
            value={value}
            formats={formats}
            modules={modules}
            onChange={setValue}
        />
    )
}

export default QuillEditorBox
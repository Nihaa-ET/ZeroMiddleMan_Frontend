import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import '../../Styles/fileupload.css'; 
import { FiUploadCloud } from "react-icons/fi";// Ensure the correct path to the CSS file

const FileUpload = ({ onFileChange }) => {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        onFileChange(selectedFile); // Pass the selected file to the parent component
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile);
        onFileChange(droppedFile); // Pass the dropped file to the parent component
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove('drag-over');
    };

    const triggerFileInput = () => {
        fileInputRef.current.click(); // Programmatically trigger the file input click event
    };

    return (
        <div
            className="upload-section"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                id="file-input"
                ref={fileInputRef} // Attach the ref to the input
                style={{ display: 'none' }}
            />
            <label htmlFor="file-input" className="upload-label">
                <div className="upload-area" onClick={triggerFileInput}> {/* Trigger the file input on click */}
                    <FiUploadCloud  className='upload-icon'/>
                    <p>Drag your file here </p>
                    {file ? (
                        <p>{file.name}</p>
                    ) : (
                    
                        <button type="button" className='select-file-btn'>Select File</button>
                    )}
                </div>
            </label>
        </div>
    );
};

export default FileUpload;

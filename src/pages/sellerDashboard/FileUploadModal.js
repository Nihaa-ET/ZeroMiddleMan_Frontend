import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as XLSX from 'xlsx';
import FileUpload from './FileUpload';
import '../../Styles/fileuploadmodal.css'; // Adjust the path according to your file structure

const FileUploadModal = ({ isOpen, onClose, onFileUpload }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (selectedFile) => {
        setFile(selectedFile); // Update the state with the selected or dropped file
    };

    const handleFileUpload = async () => {
        if (!file) {
            alert('Please upload a file first.');
            return;
        }

        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Assuming the Excel file has a single sheet with all the data
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);

                await onFileUpload(json); // Pass the JSON data to the parent component
                alert('File uploaded successfully!');
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Error uploading file. Please check the console for more details.');
            }
        };

        reader.onerror = (e) => {
            console.error('File could not be read:', e.target.error);
            alert('File could not be read. Please try again.');
        };

        reader.readAsArrayBuffer(file);
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="fileupload-modal-content">
                <h1>Upload Seller</h1>
                <FileUpload onFileChange={handleFileChange} />
                <br />
                <div className='uploading-btn'> 
                    <button className='upload-cancel-btn'onClick={onClose}>Cancel</button>
                    <button className='upload-btn' onClick={handleFileUpload}>Upload</button> {/* Upload button and its functionality */}
                    </div>
               
            </div>
        </div>,
        document.body
    );
};

export default FileUploadModal;

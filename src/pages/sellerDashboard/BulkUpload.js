import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import SummaryApi from '../../common/index'; // Adjust the path according to your file structure

function BulkUpload() {
    const [file, setFile] = useState(null);
    const [sellers, setSellers] = useState([]);

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle file upload to the server
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
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);

                // Send the JSON data to the server
                const response = await fetch(SummaryApi.uploadsellers.url, {
                    method: SummaryApi.uploadsellers.method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(json),
                });

                if (response.ok) {
                    alert('File uploaded successfully!');
                    fetchSellers(); // Refresh data after upload
                } else {
                    const errorText = await response.text();
                    alert(`Error uploading file: ${errorText}`);
                }
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

    // Fetch sellers data from the server
    const fetchSellers = async () => {
        try {
            const response = await fetch(SummaryApi.getsellers.url, {
                method: SummaryApi.getsellers.method,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setSellers(data);
        } catch (error) {
            console.error('Error fetching sellers:', error);
        }
    };

    useEffect(() => {
        fetchSellers();
    }, []);

    // Download sellers data as Excel without 'id', 'created', and 'updated' fields
    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            sellers.map(({ id, created, updated, ...seller }) => seller) // Exclude 'id', 'created', 'updated'
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sellers');
        XLSX.writeFile(workbook, 'sellers.xlsx');
    };

    return (
        <div className="container">
            <div className="upload-section">
                <h1>Upload Excel File</h1>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                />
                <button onClick={handleFileUpload}>Upload</button>
            </div>

            <div className="table-section">
                <h1>Sellers</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Seller Name</th>
                            <th>Company Name</th>
                            <th>Company Short Description</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((seller) => (
                            <tr key={seller.id}>
                                <td>{seller.contactPersonName}</td>
                                <td>{seller.companyName}</td>
                                <td>{seller.companyShortDescription}</td>
                                <td>{seller.email}</td>
                                <td>{seller.phoneNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleDownload}>Download as Excel</button>
            </div>
        </div>
    );
}

export default BulkUpload;

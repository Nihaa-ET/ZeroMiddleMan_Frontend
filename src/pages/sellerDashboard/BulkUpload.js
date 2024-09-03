import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import SummaryApi from '../../common/index'; // Adjust the path according to your file structure
// import '../../Styles/bulkUpload.css'; // Create this CSS file for styling

function BulkUpload() {
    const [file, setFile] = useState(null);
    const [sellers, setSellers] = useState([]);

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle file drop
    const handleDrop = (e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
    };

    // Handle drag over
    const handleDragOver = (e) => {
        e.preventDefault();
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
    
                // Extract sellers and products sheets
                const sellersSheetName = workbook.SheetNames.find(name => name.toLowerCase().includes('sellers'));
                const productsSheetName = workbook.SheetNames.find(name => name.toLowerCase().includes('products'));
    
                if (!sellersSheetName || !productsSheetName) {
                    alert('Excel file must contain both "sellers" and "products" sheets.');
                    return;
                }
    
                const sellersWorksheet = workbook.Sheets[sellersSheetName];
                const productsWorksheet = workbook.Sheets[productsSheetName];
    
                const sellersJson = XLSX.utils.sheet_to_json(sellersWorksheet);
                const productsJson = XLSX.utils.sheet_to_json(productsWorksheet);
    
                // Send the data to the server
                const response = await fetch(SummaryApi.uploadsellers.url, {
                    method: SummaryApi.uploadsellers.method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sellers: sellersJson, products: productsJson }),
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

    // Download sellers and their products as Excel
    const handleDownload = () => {
        const combinedData = sellers.flatMap(seller => 
            seller.products.map(product => ({
                company_name: seller.company_name,
                contact_person_name: seller.contact_person_name,
                company_short_description: seller.company_short_description,
                email: seller.email,
                phone_number: seller.phone_number,
                alternative_number: seller.alternative_number,
                street: seller.street,
                locality: seller.locality,
                city: seller.city,
                pin: seller.pin,
                state: seller.state,
                country: seller.country,
                gst_vat_tax_number: seller.gst_vat_tax_number,
                year_of_incorporation: seller.year_of_incorporation,
                total_employees: seller.total_employees,
                business_website_url: seller.business_website_url,
                major_business_type: seller.major_business_type,
                product_name: product.product_name,
                category_of_product: product.category_of_product,
                hsn_code: product.hsn_code,
                indicative_price_range: product.indicative_price_range,
                short_description: product.short_description,
                monthly_production_capacity: product.monthly_production_capacity,
            }))
        );

        const worksheet = XLSX.utils.json_to_sheet(combinedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sellers and Products');
        XLSX.writeFile(workbook, 'sellers_and_products.xlsx');
    };

    return (
        <div className="container">
            <div
                className="upload-section"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <h1>Upload Seller</h1>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    id="file-input"
                    style={{ display: 'none' }}
                />
                <label htmlFor="file-input" className="upload-label">
                    <div className="upload-area">
                        {file ? (
                            <p>{file.name}</p>
                        ) : (
                            <button>Select File</button>
                        )}
                    </div>
                </label>
                <br/>
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
                                <td>{seller.contact_person_name}</td>
                                <td>{seller.company_name}</td>
                                <td>{seller.company_short_description}</td>
                                <td>{seller.email}</td>
                                <td>{seller.phone_number}</td>
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

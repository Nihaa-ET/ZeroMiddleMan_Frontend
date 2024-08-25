import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import your CSS file
import SummaryApi from '../../common/index'; // Adjust the path according to your file structure

const AddSeller = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        contactPersonName: '',
        companyShortDescription: '',
        email: '',
        phoneNumber: '',
        alternativeNumber: '',
        companyAddressStreet: '',
        companyAddressLocality: '',
        companyAddressCity: '',
        companyAddressPIN: '',
        companyAddressState: '',
        companyAddressCountry: '',
        gstVatTaxNumber: '',
        yearOfIncorporation: '',
        totalNoOfEmployees: '',
        businessWebsiteURL: '',
        majorBusinessType: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(SummaryApi.addseller.url, {
                method: SummaryApi.addseller.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Seller added successfully!');
                console.log('Seller added successfully:', data);
                setFormData({
                    companyName: '',
                    contactPersonName: '',
                    companyShortDescription: '',
                    email: '',
                    phoneNumber: '',
                    alternativeNumber: '',
                    companyAddressStreet: '',
                    companyAddressLocality: '',
                    companyAddressCity: '',
                    companyAddressPIN: '',
                    companyAddressState: '',
                    companyAddressCountry: '',
                    gstVatTaxNumber: '',
                    yearOfIncorporation: '',
                    totalNoOfEmployees: '',
                    businessWebsiteURL: '',
                    majorBusinessType: ''
                }); // Clear form after successful submission
            } else {
                toast.error('There was an error adding the seller!');
                console.error('Error adding seller:', data.message);
            }
        } catch (error) {
            toast.error('There was an error adding the seller!');
            console.error('Error adding seller:', error);
        }
    };

    return (
        <>
            <form className="add-seller-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Company Name*"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="contactPersonName"
                            value={formData.contactPersonName}
                            onChange={handleChange}
                            placeholder="Seller Name"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email*"
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone Number*"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="alternativeNumber"
                            value={formData.alternativeNumber}
                            onChange={handleChange}
                            placeholder="Alternative Number"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="companyAddressStreet"
                            value={formData.companyAddressStreet}
                            onChange={handleChange}
                            placeholder="Company Address Street"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="companyAddressLocality"
                            value={formData.companyAddressLocality}
                            onChange={handleChange}
                            placeholder="Company Address Locality"
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div>
                        <input
                            type="text"
                            name="companyAddressCity"
                            value={formData.companyAddressCity}
                            onChange={handleChange}
                            placeholder="Company Address City*"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="companyAddressPIN"
                            value={formData.companyAddressPIN}
                            onChange={handleChange}
                            placeholder="Company Address PIN*"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="companyAddressState"
                            value={formData.companyAddressState}
                            onChange={handleChange}
                            placeholder="Company Address State*"
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div>
                        <input
                            type="text"
                            name="companyAddressCountry"
                            value={formData.companyAddressCountry}
                            onChange={handleChange}
                            placeholder="Company Address Country*"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="gstVatTaxNumber"
                            value={formData.gstVatTaxNumber}
                            onChange={handleChange}
                            placeholder="GST/VAT/TAX Number"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            name="yearOfIncorporation"
                            value={formData.yearOfIncorporation}
                            onChange={handleChange}
                            placeholder="Year of Incorporation"
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div>
                        <select
                            name="totalNoOfEmployees"
                            value={formData.totalNoOfEmployees}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Total no. of Employees*</option>
                            <option value="1 to 20">1 to 20</option>
                            <option value="21 to 100">21 to 100</option>
                            <option value="101 to 500">101 to 500</option>
                            <option value="500">500</option>
                        </select>
                    </div>
                    <div>
                        <input
                            type="url"
                            name="businessWebsiteURL"
                            value={formData.businessWebsiteURL}
                            onChange={handleChange}
                            placeholder="Business / Website URL"
                        />
                    </div>
                    <div>
                        <select
                            name="majorBusinessType"
                            value={formData.majorBusinessType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Major Business Type*</option>
                            <option value="Manufacturer">Manufacturer</option>
                            <option value="Farmer">Farmer</option>
                            <option value="Producer">Producer</option>
                            <option value="Original Service Provider">Original Service Provider</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div>
                        <textarea
                            name="companyShortDescription"
                            value={formData.companyShortDescription}
                            onChange={handleChange}
                            placeholder="Company Short Description*"
                            required
                        />
                    </div>
                </div>
                <div className="button-container">
                    <button type="submit">Add Seller</button>
                </div>
            </form>
            <ToastContainer />
        </>
    );
};

export default AddSeller;

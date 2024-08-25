import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../../common/index'; // Ensure this path is correct based on your file structure

const EditSeller = ({ sellerId }) => {
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
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch current seller data if sellerId is provided
        const fetchSellerData = async () => {
            setLoading(true);
            try {
                const { url, method } = SummaryApi.getSellerById(sellerId);
                const response = await fetch(url, { method });
                const data = await response.json();
                if (response.ok) {
                    setFormData(data);
                } else {
                    toast.error('Error fetching seller data!');
                }
            } catch (error) {
                toast.error('Error fetching seller data!');
                console.error('Error:', error);
            }
            setLoading(false);
        };

        if (sellerId) {
            fetchSellerData();
        }
    }, [sellerId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { url, method } = SummaryApi.updatesellers(sellerId);
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Seller updated successfully!');
                console.log('Seller updated successfully:', data);
            } else {
                toast.error('Error updating seller!');
                console.error('Error:', data.message);
            }
        } catch (error) {
            toast.error('Error updating seller!');
            console.error('Error:', error);
        }
        setLoading(false);
    };

    return (
        <>
            <form className="edit-seller-form" onSubmit={handleSubmit}>
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
                            placeholder="Contact Person Name"
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
                </div>
                <div className="form-row">
                    <div>
                        <input
                            type="text"
                            name="companyAddressLocality"
                            value={formData.companyAddressLocality}
                            onChange={handleChange}
                            placeholder="Company Address Locality"
                        />
                    </div>
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
                </div>
                <div className="form-row">
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
                </div>
                <div className="form-row">
                    <div>
                        <input
                            type="number"
                            name="yearOfIncorporation"
                            value={formData.yearOfIncorporation}
                            onChange={handleChange}
                            placeholder="Year of Incorporation"
                        />
                    </div>
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
                </div>
                <div className="form-row">
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
                    <button className='update-button' type="submit" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Seller'}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </>
    );
};

export default EditSeller;

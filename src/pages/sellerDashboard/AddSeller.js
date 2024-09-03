import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Addseller.css';
import SummaryApi from '../../common/index';
import { GoDash } from "react-icons/go";

const AddSellerForm = () => {
    const initialProductState = {
        product_name: '',
        category_of_product: '',
        hsn_code: '',
        indicative_price_range: '',
        short_description: '',
        monthly_production_capacity: ''
    };

    const [formData, setFormData] = useState({
        company_name: '',
        contact_person_name: '',
        company_short_description: '',
        email: '',
        phone_number: '',
        alternative_number: '',
        street: '',
        locality: '',
        city: '',
        pin: '',
        state: '',
        country: '',
        gst_vat_tax_number: '',
        year_of_incorporation: '',
        total_employees: '',
        business_website_url: '',
        major_business_type: '',
        products: [initialProductState]
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleProductChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProducts = formData.products.map((product, i) =>
            i === index ? { ...product, [name]: value } : product
        );
        setFormData(prevState => ({
            ...prevState,
            products: updatedProducts
        }));
    };

    const addProduct = () => {
        setFormData(prevState => ({
            ...prevState,
            products: [...prevState.products, initialProductState]
        }));
    };

    const removeProduct = (index) => {
        const updatedProducts = formData.products.filter((_, i) => i !== index);
        setFormData(prevState => ({
            ...prevState,
            products: updatedProducts
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Payload:', formData);

        fetch(SummaryApi.addseller.url, {
            method: SummaryApi.addseller.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Something went wrong');
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setFormData({
                    company_name: '',
                    contact_person_name: '',
                    company_short_description: '',
                    email: '',
                    phone_number: '',
                    alternative_number: '',
                    street: '',
                    locality: '',
                    city: '',
                    pin: '',
                    state: '',
                    country: '',
                    gst_vat_tax_number: '',
                    year_of_incorporation: '',
                    total_employees: '',
                    business_website_url: '',
                    major_business_type: '',
                    products: [initialProductState]
                });
                navigate('/home/seller-dashboard/allseller-details');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <form className="add-seller-form" onSubmit={handleSubmit}>
            <div className="form-section">
                <div className="basic-info">
                    <h3>BASIC DETAILS</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Seller Name<span>*</span></label>
                            <input
                                type="text"
                                name="contact_person_name"
                                value={formData.contact_person_name}
                                placeholder="Seller Name"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Company Name<span>*</span></label>
                            <input
                                type="text"
                                name="company_name"
                                value={formData.company_name}
                                placeholder="Company Name"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email<span>*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="Email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number<span>*</span></label>
                            <input
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
                                placeholder="Phone Number"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Alternative Number</label>
                            <input
                                type="text"
                                name="alternative_number"
                                value={formData.alternative_number}
                                placeholder="Alternative Number"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h3>COMPANY DETAILS</h3>
                <div className="form-row">
                    <div className="form-group">
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            placeholder="Street"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="locality"
                            value={formData.locality}
                            placeholder="Locality"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            placeholder="City"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <input
                            type="text"
                            name="pin"
                            value={formData.pin}
                            placeholder="PIN"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            placeholder="State"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            placeholder="Country"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <input
                            type="text"
                            name="gst_vat_tax_number"
                            value={formData.gst_vat_tax_number}
                            placeholder="GST/VAT/Tax Number"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="year_of_incorporation"
                            value={formData.year_of_incorporation}
                            placeholder="Year of Incorporation"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <select
                            name="total_employees"
                            value={formData.total_employees}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Total Employees</option>
                            <option value="1 to 20">1 to 20</option>
                            <option value="21 to 100">21 to 100</option>
                            <option value="101 to 500">101 to 500</option>
                            <option value=">500">Above 500</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <input
                            type="url"
                            name="business_website_url"
                            value={formData.business_website_url}
                            placeholder="Business Website URL"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <select
                            name="major_business_type"
                            value={formData.major_business_type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Major Business Type</option>
                            <option value="Farmer">Farmer</option>
                            <option value="Producer">Producer</option>
                            <option value="Manufacturer">Manufacturer</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group full-width">
                        <textarea
                            name="company_short_description"
                            value={formData.company_short_description}
                            placeholder="Company Short Description"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="form-section">
                <h3>PRODUCT DETAILS</h3>
                {formData.products.map((product, index) => (
                    <div key={index} className="product-section">
                        {formData.products.length > 1 && (
                            <div className="remove-product-container">
                                <button
                                    type="button"
                                    className="remove-product-btn"
                                    onClick={() => removeProduct(index)}
                                >
                                    <GoDash />
                                </button>
                            </div>
                        )}
                        <div className="product-form-group">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="product_name"
                                    value={product.product_name}
                                    placeholder="Product Name"
                                    onChange={(e) => handleProductChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="category_of_product"
                                    value={product.category_of_product}
                                    placeholder="Category of Product"
                                    onChange={(e) => handleProductChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="hsn_code"
                                    value={product.hsn_code}
                                    placeholder="HSN Code"
                                    onChange={(e) => handleProductChange(index, e)}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="indicative_price_range"
                                    value={product.indicative_price_range}
                                    placeholder="Indicative Price Range"
                                    onChange={(e) => handleProductChange(index, e)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="monthly_production_capacity"
                                value={product.monthly_production_capacity}
                                placeholder="Monthly Production Capacity"
                                onChange={(e) => handleProductChange(index, e)}
                            />
                        </div>

                        <div className="form-group full-width">
                            <textarea
                                name="short_description"
                                value={product.short_description}
                                placeholder="Product Short Description"
                                onChange={(e) => handleProductChange(index, e)}
                            />
                        </div>

                    </div>
                ))}
                
            </div>
            <div className='add-seller-btns'>
                <button type="button" className="add-product-btn" onClick={addProduct}>
                    Add Another Product
                </button>
                <button type="submit" className="submit-btn">Submit</button>
            </div>
        </form>
    );
};

export default AddSellerForm;

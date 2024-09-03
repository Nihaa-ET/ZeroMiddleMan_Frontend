import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SummaryApi from '../../common';
import '../../Styles/editseller.css'; // Import the CSS file

const EditSellers = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [sellerDetails, setSellerDetails] = useState({
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
      // Additional fields
      product_name: '',
      category_of_product: '',
      hsn_code: '',
    });
    const [sellerProducts, setSellerProducts] = useState([]);
  
    useEffect(() => {
      if (!id) {
        console.error('No sellerId provided');
        return;
      }
  
      const fetchSellerDetails = async () => {
        try {
          const response = await fetch(SummaryApi.getSellerById.url(id), {
            method: SummaryApi.getSellerById.method,
            credentials: 'include',
          });
          const data = await response.json();
          if (data.length > 0) { // Check if data array has at least one element
            setSellerDetails(data[0]); // Set the first element as the seller details
          }
        } catch (error) {
          console.error('Error fetching seller details:', error);
        }
      };
      
      const fetchSellerProducts = async () => {
        try {
          const response = await fetch(SummaryApi.getProductById.url(id), {
            method: SummaryApi.getProductById.method,
            credentials: 'include',
          });
          const data = await response.json();
          if (Array.isArray(data)) { // Check if data is an array
            setSellerProducts(data);
          }
        } catch (error) {
          console.error('Error fetching seller products:', error);
        }
      };
  
      fetchSellerDetails();
      fetchSellerProducts();
    }, [id]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setSellerDetails({ ...sellerDetails, [name]: value });
    };
  
    const handleProductChange = (index, e) => {
      const { name, value } = e.target;
      const updatedProducts = [...sellerProducts];
      updatedProducts[index][name] = value;
      setSellerProducts(updatedProducts);
    };
  
    const handleSaveClick = async () => {
        try {
            // Save seller details
            const response = await fetch(SummaryApi.updatesellers.url(id), {
                method: SummaryApi.updatesellers.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sellerDetails),
                credentials: 'include',
            });
    
            if (response.ok) {
                alert('Seller details updated successfully.');
    
                // Save the products
                for (const product of sellerProducts) {
                    await fetch(SummaryApi.updateproducts.url(product.id), {
                        method: SummaryApi.updateproducts.method,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(product),
                        credentials: 'include',
                    });
                }
    
                // Navigate to ViewSellers with the seller ID
                navigate(`/home/seller-dashboard/view-seller-details/${id}`);
            } else {
                alert('Failed to update the seller details.');
            }
        } catch (error) {
            console.error('Error updating seller details:', error);
        }
    };
    

  return (
    <div className="edit-sellers-container">
      <h2>Edit Seller</h2>
      <form className="edit-seller-form">
        {/* Seller Details Fields */}
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="company_name"
            value={sellerDetails.company_name || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Contact Person Name</label>
          <input
            type="text"
            name="contact_person_name"
            value={sellerDetails.contact_person_name || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Company Description</label>
          <textarea
            name="company_short_description"
            value={sellerDetails.company_short_description || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={sellerDetails.email || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={sellerDetails.phone_number || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Alternative Number</label>
          <input
            type="text"
            name="alternative_number"
            value={sellerDetails.alternative_number || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Street</label>
          <input
            type="text"
            name="street"
            value={sellerDetails.street || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Locality</label>
          <input
            type="text"
            name="locality"
            value={sellerDetails.locality || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={sellerDetails.city || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>PIN</label>
          <input
            type="text"
            name="pin"
            value={sellerDetails.pin || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            name="state"
            value={sellerDetails.state || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={sellerDetails.country || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>GST/VAT/Tax Number</label>
          <input
            type="text"
            name="gst_vat_tax_number"
            value={sellerDetails.gst_vat_tax_number || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Year of Incorporation</label>
          <input
            type="text"
            name="year_of_incorporation"
            value={sellerDetails.year_of_incorporation || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Total Employees</label>
          <input
            type="text"
            name="total_employees"
            value={sellerDetails.total_employees || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Business Website URL</label>
          <input
            type="text"
            name="business_website_url"
            value={sellerDetails.business_website_url || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Major Business Type</label>
          <input
            type="text"
            name="major_business_type"
            value={sellerDetails.major_business_type || ''}
            onChange={handleInputChange}
          />
        </div>

        {/* Product Details Fields */}
        <h2>Edit Products</h2>
        {sellerProducts.map((product, index) => (
          <div key={product.id} className="product-group">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="product_name"
                value={product.product_name || ''}
                onChange={(e) => handleProductChange(index, e)}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category_of_product"
                value={product.category_of_product || ''}
                onChange={(e) => handleProductChange(index, e)}
              />
            </div>

            <div className="form-group">
              <label>HSN Code</label>
              <input
                type="text"
                name="hsn_code"
                value={product.hsn_code || ''}
                onChange={(e) => handleProductChange(index, e)}
              />
            </div>

            {/* Add more fields as needed */}
          </div>
        ))}

        <button type="button" onClick={handleSaveClick}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditSellers;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SummaryApi from '../../common';
import '../../Styles/viewsellers.css';// Import the CSS file
import { FaRegTrashAlt } from "react-icons/fa"; 
import { FaEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';

const ViewSellers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("Seller ID:", id);
  const role = useSelector((state) => state.user.role);

  const [sellerDetails, setSellerDetails] = useState({});
  const [sellerProducts, setSellerProducts] = useState([]);
  const [showDescription, setShowDescription] = useState({}); // State to manage description visibility

  useEffect(() => {
    if (!id) {
      console.error('No sellerId provided');
      return;
    }

    console.log('Fetching details for sellerId:', id);

    const fetchSellerDetails = async () => {
      try {
        const response = await fetch(SummaryApi.getSellerById.url(id), {
          method: SummaryApi.getSellerById.method
        });
        const data = await response.json();
        console.log('Seller Details Response:', data);
        if (data.length > 0) {
          setSellerDetails(data[0]);
        }
      } catch (error) {
        console.error('Error fetching seller details:', error);
      }
    };

    const fetchSellerProducts = async () => {
      try {
        const response = await fetch(SummaryApi.getProductById.url(id), {
          method: SummaryApi.getProductById.method
        });
        const data = await response.json();
        console.log('Seller Products Response:', data);
        setSellerProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchSellerDetails();
    fetchSellerProducts();
  }, [id]);

  const handleEditClick = () => {
    navigate(`/home/seller-dashboard/edit-seller/${id}`);
  };

  const handleTrashClick = async () => {
    if (window.confirm('Are you sure you want to trash this seller and their products?')) {
      try {
        const disableSellerUrl = SummaryApi.disableAndDeleteSeller.url(id);
        const disableProductsUrl = SummaryApi.disableAndDeleteProduct.url(id);

        const [sellerResponse, productsResponse] = await Promise.all([
          fetch(disableSellerUrl, { method: SummaryApi.disableAndDeleteSeller.method }),
          fetch(disableProductsUrl, { method: SummaryApi.disableAndDeleteProduct.method })
        ]);

        if (sellerResponse.ok && productsResponse.ok) {
          alert('Seller and their products have been trashed successfully.');
          navigate('/home/seller-dashboard/allseller-details');
        } else {
          alert('Failed to trash the seller and/or their products.');
        }
      } catch (error) {
        console.error('Error trashing the seller and/or products:', error);
      }
    }
  };

  const toggleDescription = (productId) => {
    setShowDescription(prevState => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };

  return (
    <div className="view-sellers-container">
      <div className="buttons-container">
      {(role === 'Admin' || role === 'superadmin' || role==='TL' || role==='Editor') && (
        <button onClick={handleEditClick} className="edit-button"> <span><FaEdit /></span>Edit</button>
      )}
        {(role === 'Admin' || role === 'superadmin' || role==='TL') && (
        <button onClick={handleTrashClick} className="trash-button"> <span><FaRegTrashAlt /></span>Trash</button>
        )}
      </div>

      <div className="seller-details-container">
        <h2>Company Details</h2>
        <div className="row">
          <div className='col-lg-6 seller-details'>
            <p><strong>Company Name:</strong> {sellerDetails.company_name || 'N/A'}</p>
            <p><strong>Contact Person Name:</strong> {sellerDetails.contact_person_name || 'N/A'}</p>
            <p><strong>Company Description:</strong> {sellerDetails.company_short_description || 'N/A'}</p>
            <p><strong>Email:</strong> {sellerDetails.email || 'N/A'}</p>
            <p><strong>Phone Number:</strong> {sellerDetails.phone_number || 'N/A'}</p>
            <p><strong>Alternative Number:</strong> {sellerDetails.alternative_number || 'N/A'}</p>
            <p><strong>Street:</strong> {sellerDetails.street || 'N/A'}</p>
            <p><strong>Locality:</strong> {sellerDetails.locality || 'N/A'}</p>
            <p><strong>City:</strong> {sellerDetails.city || 'N/A'}</p>  
          </div>
          <div className='col-lg-6 seller-details'>
            <p><strong>PIN:</strong> {sellerDetails.pin || 'N/A'}</p>
            <p><strong>State:</strong> {sellerDetails.state || 'N/A'}</p>
            <p><strong>Country:</strong> {sellerDetails.country || 'N/A'}</p>
            <p><strong>GST/VAT/Tax Number:</strong> {sellerDetails.gst_vat_tax_number || 'N/A'}</p>
            <p><strong>Year of Incorporation:</strong> {sellerDetails.year_of_incorporation || 'N/A'}</p>
            <p><strong>Total Employees:</strong> {sellerDetails.total_employees || 'N/A'}</p>
            <p><strong>Business Website URL:</strong> <a href={sellerDetails.business_website_url || '#'} target="_blank" rel="noopener noreferrer">{sellerDetails.business_website_url || 'N/A'}</a></p>
            <p><strong>Major Business Type:</strong> {sellerDetails.major_business_type || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="products-container">
      <h2>Products</h2>
      <ul>
        {sellerProducts.map(product => (
          <li key={product.id}>
            <p><strong>Product Name:</strong> {product.product_name || 'N/A'}</p>
            <p><strong>Category:</strong> {product.category_of_product || 'N/A'}</p>
            <p><strong>HSN Code:</strong> {product.hsn_code || 'N/A'}</p>
            <p><strong>Price Range:</strong> {product.indicative_price_range || 'N/A'}</p>
            <p><strong>Monthly Production Capacity:</strong> {product.monthly_production_capacity || 'N/A'}</p>
            <div className='view-description'>
            <button 
              onClick={() => toggleDescription(product.id)} 
              className="view-description-button"
            >
              {showDescription[product.id] ? 'Hide Description' : 'View Description'}
            </button>
            <div 
              className={`description ${showDescription[product.id] ? 'show' : ''}`}
            >
              <h2>Description:</h2>
              <p>{product.short_description || 'N/A'}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>

    </div>
  );
};

export default ViewSellers;

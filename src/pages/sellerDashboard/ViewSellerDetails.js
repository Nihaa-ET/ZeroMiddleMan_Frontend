import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css'; // Import your CSS file
import SummaryApi from "../../common";

const ViewSellerDetails = () => {
const role = useSelector((state) => state.user.role);
const { id } = useParams(); // Get seller ID from the route params
const [seller, setSeller] = useState(null);
const navigate = useNavigate();

useEffect(() => {
// Fetch seller details by ID using fetch API
fetch(SummaryApi.getSellerById.url(id))
.then(response => response.json())
.then(data => {
setSeller(data);
})
.catch(error => {
console.error('Error fetching seller details:', error);
toast.error('Failed to fetch seller details');
});
}, [id]);

const handleEdit = () => {
// Navigate to the edit seller form
navigate(`/home/seller-deshboard/edit-seller/${seller.id}`);
};

const handleTrashSeller = () => {
// Confirm before trashing
confirmAlert({
title: 'Confirm to Trash',
message: 'Are you sure you want to trash this seller?',
buttons: [
{
label: 'Yes',
onClick: async () => {
try {
const response = await fetch(SummaryApi.disableAndDeleteSeller.url(id), {
method: SummaryApi.disableAndDeleteSeller.method,
headers: { 'Content-Type': 'application/json' }
});
const data = await response.json();

          if (response.ok) {
            toast.success("Seller trashed successfully.");
            navigate('/home/seller-deshboard/all-seller');
          } else {
            toast.error(data.message || "Failed to trash seller.");
          }
        } catch (error) {
          console.error("Error trashing seller:", error);
          toast.error("An error occurred while trashing the seller.");
        }
      }
    },
    {
      label: 'No',
      onClick: () => { /* Do nothing */ }
    }
  ]
});
};

return (
<div className="view-seller-details">
<div className="buttons-container">
{(role === 'superadmin'|| role === 'Admin'|| role ==='TL' || role==='Editor') && (
<button onClick={handleEdit}>Edit Seller</button>
)}
{(role === 'superadmin'|| role === 'Admin'|| role ==='TL') && (
<button onClick={handleTrashSeller} style={{backgroundColor:"#FF0000"}}>Trash Seller</button>
)}
</div>
<h1>Seller Details</h1>
{seller ? (
<div className="seller-details">
<p><strong>Company Name:</strong> {seller.companyName}</p>
<p><strong>Contact Person Name:</strong> {seller.contactPersonName}</p>
<p><strong>Company Description:</strong> {seller.companyShortDescription}</p>
<p><strong>Email:</strong> {seller.email}</p>
<p><strong>Phone Number:</strong> {seller.phoneNumber}</p>
<p><strong>Alternative Number:</strong> {seller.alternativeNumber}</p>
<p><strong>Address Street:</strong> {seller.companyAddressStreet}</p>
<p><strong>Address Locality:</strong> {seller.companyAddressLocality}</p>
<p><strong>Address City:</strong> {seller.companyAddressCity}</p>
<p><strong>Address PIN:</strong> {seller.companyAddressPIN}</p>
<p><strong>Address State:</strong> {seller.companyAddressState}</p>
<p><strong>Address Country:</strong> {seller.companyAddressCountry}</p>
<p><strong>GST Number:</strong> {seller.gstVatTaxNumber}</p>
<p><strong>Year of Incorporation:</strong> {seller.yearOfIncorporation}</p>
<p><strong>Total Employees:</strong> {seller.totalNoOfEmployees}</p>
<p><strong>Website URL:</strong> {seller.businessWebsiteURL}</p>
<p><strong>Major Business Type:</strong> {seller.majorBusinessType}</p>
</div>
) : (
<p>Loading seller details...</p>
)}
</div>
);
};

export default ViewSellerDetails;
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SummaryApi from '../../common'; // Adjust the path as needed
import 'react-toastify/dist/ReactToastify.css'; // Ensure styles are imported

const TrashedSellerDetails = () => {
  const role = useSelector((state) => state.user.role);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await fetch(SummaryApi.gettrashedsellers.url, {
          method: SummaryApi.gettrashedsellers.method,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.success) {
          setSellers(data.data);
        } else {
          toast.error('Failed to fetch trashed sellers.');
        }
      } catch (error) {
        console.error('Error fetching trashed sellers:', error);
        toast.error('An error occurred while fetching trashed sellers.');
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  const handleRestoreSeller = async (id) => {
    try {
      const response = await fetch(SummaryApi.restoreseller.url(id), {
        method: SummaryApi.restoreseller.method,
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Seller restored successfully.');
        setSellers(sellers.filter(seller => seller.id !== id)); // Update state
      } else {
        toast.error('Failed to restore seller.');
      }
    } catch (error) {
      console.error('Error restoring seller:', error);
      toast.error('An error occurred while restoring the seller.');
    }
  };

  const handleDeleteSeller = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this seller?')) {
      try {
        const response = await fetch(SummaryApi.deleteseller.url(id), {
          method: SummaryApi.deleteseller.method,
        });
        const data = await response.json();
        if (response.ok) {
          toast.success('Seller permanently deleted.');
          setSellers(sellers.filter(seller => seller.id !== id)); // Update state
        } else {
          toast.error(`Failed to delete seller. Server responded with: ${data.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error deleting seller:', error);
        toast.error('An error occurred while deleting the seller.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Add a loading state
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error if any
  }

  return (
    <div className="trashed-seller-details">
      <table className="trashed-seller-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Seller Name</th>
            <th>Company Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sellers.length > 0 ? (
            sellers.map((seller, index) => (
              <tr key={seller.id}>
                <td>{index + 1}</td>
                <td>{seller.contactPersonName}</td>
                <td>{seller.companyName}</td>
                <td>{seller.email}</td>
                <td>{seller.phoneNumber}</td>
                <td>
                  {(role === 'superadmin' || role === 'Admin') && (
                    <>
                      <button className="restore-btn" onClick={() => handleRestoreSeller(seller.id)}>Restore</button>
                      <button className="delete-btn" onClick={() => handleDeleteSeller(seller.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No trashed sellers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrashedSellerDetails;

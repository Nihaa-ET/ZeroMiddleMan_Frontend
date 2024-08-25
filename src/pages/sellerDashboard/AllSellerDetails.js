import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from '../../common/index'; // Adjust the path according to your file structure

const AllSellerDetails = () => {
  const [allSellers, setAllSellers] = useState([]);
  // const navigate = useNavigate();

  const fetchAllSellers = async () => {
    try {
      const response = await fetch(SummaryApi.getSellersDetails.url, {
        method: SummaryApi.getSellersDetails.method,
        credentials: 'include',
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Failed to fetch sellers.');
      }

      const data = await response.json();

      if (data.success) {
        setAllSellers(data.data);
        console.log("Fetched Sellers Data:", data.data);
      } else {
        toast.error(data.message || "Failed to fetch sellers.");
      }
    } catch (error) {
      console.error("Error fetching sellers:", error);
      toast.error("An error occurred while fetching sellers.");
    }
  };

  useEffect(() => {
    fetchAllSellers();
  }, []);

  return (
    <div className="mt-3 pb-4">
      <table className="w-full seller_table">
        <thead>
          <tr className="bg-black text-white">
            <th>SR. No.</th>
            <th>Seller Name</th>
            <th>Company Name</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {allSellers.map((seller, index) => (
            <tr key={seller.id || index}>
              <td>{index + 1}</td>
              <td>
                <Link 
                  to={`/home/seller-deshboard/view-seller-details/${seller.id}`} 
                  style={{ textDecoration: 'none', color: 'red' }}
                >
                  {seller.contactPersonName}
                </Link>
              </td>
              <td>
                <Link 
                  to={`/home/seller-deshboard/view-seller-details/${seller.id}`} 
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {seller.companyName}
                </Link>
              </td>
              <td>
                <Link 
                  to={`/home/seller-deshboard/view-seller-details/${seller.id}`} 
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {seller.email}
                </Link>
              </td>
              <td>
                <Link 
                  to={`/home/seller-deshboard/view-seller-details/${seller.id}`} 
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {seller.phoneNumber}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllSellerDetails;

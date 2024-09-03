import React, { useState, useEffect } from "react";
import Restore from '../../Assests/restore.png';
import Delete from '../../Assests/delete.png';
import { IoArrowDownSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import "../../Styles/trashseller.css";
import SummaryApi from "../../common";

const SellerItem = ({ sellerName, onRestore, onDelete }) => {
  return (
    <div className="seller-item">
      <span className="seller-name">{sellerName}</span>
      <div className="actions">
        <div>
          <img src={Restore} className="res-btn" alt="Restore" onClick={onRestore} />
        </div>
        <div>
          <img src={Delete} className="del-btn" alt="Delete" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

const Modal = ({ message, onConfirm, onCancel, isRestore }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-icon">
          <FaCheckCircle size={48} color={isRestore ? "#ea2e2e" : "#ff0000"} />
        </div>
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="confirm-btn" onClick={onConfirm}>
            {isRestore ? "Restore" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

function TrashSeller() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isRestore, setIsRestore] = useState(true);
  const [sellers, setSellers] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // Store a single selected ID
  const [type, setType] = useState(""); // 'seller' or 'product'

  // Fetch deleted sellers and products
  const fetchDeletedProductSellers = async () => {
    try {
      const response = await fetch(SummaryApi.getAllDisabledSellers.url, {
        method: SummaryApi.getAllDisabledSellers.method,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setSellers(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDeletedProductSellers(); 
  }, []);

  const handleRestore = () => {
    setModalMessage("Do you want to restore the selected item?");
    setIsRestore(true);
    setType("seller"); // or setType("product") based on the context
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    setModalMessage("Do you want to delete the selected item?");
    setIsRestore(false);
    setType("seller"); // or setType("product") based on the context
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (selectedId !== null) {
      try {
        // Determine the URL and method based on whether you're restoring or permanently deleting
        const apiUrl = isRestore ? SummaryApi.restoreseller.url : SummaryApi.permanentDelete.url;
        const apiMethod = isRestore ? SummaryApi.restoreseller.method : SummaryApi.permanentDelete.method;
        
        const response = await fetch(apiUrl, {
          method: apiMethod,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type, ids: [selectedId] }), // Send selected ID as an array
        });
  
        if (response.ok) {
          alert(isRestore ? "Item restored successfully!" : "Item permanently deleted successfully!");
          fetchDeletedProductSellers(); // Refresh data after the operation
        } else {
          console.error(isRestore ? 'Failed to restore item' : 'Failed to delete item');
        }
      } catch (error) {
        console.error(isRestore ? 'Error restoring item:' : 'Error deleting item:', error);
      }
    }
  
    setIsModalOpen(false); // Close the modal after operation
  };
  

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (id) => {
    // Set selectedId to the clicked row's ID, or null if already selected
    console.log(id);
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="app">
      <SellerItem
        sellerName="Trash Seller"
        onRestore={handleRestore}
        onDelete={handleDelete}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" disabled /></th>
              <th>
                <span>sr.no <IoArrowDownSharp /></span>
              </th>
              <th>
              <span> Name <IoArrowDownSharp /></span>
              </th>
              <th>
              <span>Company Name <IoArrowDownSharp /></span>
              </th>
              <th>
              <span>HSN Code <IoArrowDownSharp /></span>
              </th>
              <th>
              <span>Categories <IoArrowDownSharp /></span>
              </th>
              <th>
              <span>Products <IoArrowDownSharp /></span>
              </th>
              <th>
              <span>Email <IoArrowDownSharp /></span>
              </th>
              <th>
              <span>Phone number <IoArrowDownSharp /></span>
              </th>
              <th>
              <span> Location <IoArrowDownSharp /></span>
              </th>
            </tr>
          </thead>
          <tbody>
           {console.log(sellers)}
           {console.log("end")}
            {sellers.length > 0 ? (
              sellers.map((seller, index) => (
                <tr key={seller.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedId === seller.seller_id} // Only check if it's the selected ID
                      onChange={() => handleCheckboxChange(seller.seller_id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{seller.contact_person_name}</td>
                  <td>{seller.company_name}</td>
                  <td>{seller.hsn_code}</td>
                  <td>{seller.category_of_product}</td>
                  <td>{seller.product_name}</td>
                  <td>{seller.email}</td>
                  <td>{seller.phone_number}</td>
                  <td>{`${seller.locality}, ${seller.city}`}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal
          message={modalMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isRestore={isRestore}
        />
      )}
    </div>
  );
}

export default TrashSeller;
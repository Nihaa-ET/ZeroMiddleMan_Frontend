import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaFileExport, FaFileImport } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import "../../Styles/AllSeller.css";
import SummaryApi from "../../common";
import FileUploadModal from "./FileUploadModal";
import { IoArrowDownSharp } from "react-icons/io5";

const CustomPagination = styled(Pagination)(({ theme }) => ({
    '& .MuiPaginationItem-root': {
        color: theme.palette.primary.main,
        '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: '#fff',
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    },
}));

const AllSeller = () => {
    const [sellersData, setSellersData] = useState([]);
    const [selectedSellers, setSelectedSellers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const rowsPerPage = 20;

    const fetchSellersAndProducts = async () => {
        try {
            const response = await fetch(SummaryApi.getAllSellersAndProductDetails.url, {
                method: SummaryApi.getAllSellersAndProductDetails.method,
                credentials: "include",
            });

            const data = await response.json();
            if (Array.isArray(data)) {
                setSellersData(data);
            } else {
                console.error("Data is not an array", data);
                setSellersData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setSellersData([]);
        }
    };

    useEffect(() => {
        fetchSellersAndProducts();
    }, []);

    const handleViewSeller = (sellerId) => {
        navigate(`/home/seller-dashboard/view-seller-details/${sellerId}`);
    };

    const handleFileUpload = async (jsonData) => {
        try {
            const response = await fetch(SummaryApi.uploadsellers.url, {
                method: SummaryApi.uploadsellers.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: jsonData }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                alert(`Error uploading file: ${errorText}`);
                return;
            }

            fetchSellersAndProducts();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please check the console for more details.');
        }
    };

    const handleDownload = () => {
        const combinedData = sellersData.flatMap(seller =>
            seller.products.map(product => ({
                sr_no: seller.id, // Assuming seller ID as serial number
                seller_name: seller.contact_person_name,
                company_name: seller.company_name,
                email: seller.email,
                phone_number: seller.phone_number,
                location: `${seller.city}, ${seller.country}`,
                hsn_code: product.hsn_code,
                category: product.category_of_product,
                product_name: product.product_name,
            }))
        );

        const worksheet = XLSX.utils.json_to_sheet(combinedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sellers and Products');
        XLSX.writeFile(workbook, 'sellers_and_products.xlsx');
    };

    const handleCheckboxChange = (sellerId) => {
        setSelectedSellers((prevSelected) => {
            if (prevSelected.includes(sellerId)) {
                return prevSelected.filter(id => id !== sellerId);
            } else {
                return [...prevSelected, sellerId];
            }
        });
    };

    const handleTrashClick = async () => {
        if (window.confirm('Are you sure you want to trash the selected sellers and their products?')) {
            try {
                const responses = await Promise.all(
                    selectedSellers.map(async (id) => {
                        const disableSellerUrl = SummaryApi.disableAndDeleteSeller.url(id);
                        const disableProductsUrl = SummaryApi.disableAndDeleteProduct.url(id);

                        const [sellerResponse, productsResponse] = await Promise.all([
                            fetch(disableSellerUrl, { method: SummaryApi.disableAndDeleteSeller.method }),
                            fetch(disableProductsUrl, { method: SummaryApi.disableAndDeleteProduct.method })
                        ]);

                        return { sellerResponse, productsResponse };
                    })
                );

                const allSuccessful = responses.every(
                    ({ sellerResponse, productsResponse }) => sellerResponse.ok && productsResponse.ok
                );

                if (allSuccessful) {
                    alert('Selected sellers and their products have been trashed successfully.');
                    fetchSellersAndProducts();
                } else {
                    alert('Failed to trash one or more sellers and/or their products.');
                }
            } catch (error) {
                console.error('Error trashing the sellers and/or products:', error);
            }
        }
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const displayedSellers = sellersData
        .filter((item) => {
            const searchLower = search.toLowerCase();
            return (
                item.contact_person_name.toLowerCase().includes(searchLower) ||
                item.company_name.toLowerCase().includes(searchLower) ||
                item.email.toLowerCase().includes(searchLower) ||
                item.phone_number.toLowerCase().includes(searchLower) ||
                item.city.toLowerCase().includes(searchLower) ||
                item.country.toLowerCase().includes(searchLower) ||
                item.products.some(product =>
                    product.product_name.toLowerCase().includes(searchLower) ||
                    product.category_of_product.toLowerCase().includes(searchLower) ||
                    product.hsn_code.toLowerCase().includes(searchLower)
                )
            );
        })
        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className="all-seller-toolbar-container">
            <div className="all-seller-div">
                <div className="row">
                    <div className="col-lg-3 all-seller-left-section">
                        <div className="all-seller-filter-dropdown">
                            <select className="all-seller-filter-select">
                                <option value="">Filter by... </option>
                                <option value="active">Active Sellers</option>
                                <option value="inactive">Inactive Sellers</option>
                                <option value="recent">Recently Added</option>
                                <option value="top">Top Sellers</option>
                            </select>
                        </div>

                        <button
                            className="all-seller-btn all-seller-add-seller-btn"
                            onClick={() => navigate('/home/seller-dashboard/add-seller')}
                        >
                            <AiOutlineUserAdd className="all-seller-icon" /> Add seller
                        </button>
                        <button
                            className="all-seller-delete-btn"
                            onClick={handleTrashClick}
                        >
                            <FiTrash2 />
                        </button>
                    </div>

                    <div className="col-lg-4">
                        <input
                            className="search-seller"
                            type="search"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Seller"
                        />
                    </div>
                    <div className="col-lg-5 all-seller-right-section">
                        <button
                            className="all-seller-btn all-seller-export-excel-btn"
                            onClick={handleDownload}
                        >
                            <FaFileExport className="all-seller-icon" /> Export Excel
                        </button>
                        <button
                            className="all-seller-btn all-seller-import-excel-btn"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <FaFileImport className="all-seller-icon" /> Import Excel
                        </button>
                        <Stack spacing={1} className="pagination">
                            <CustomPagination
                                count={Math.ceil(sellersData.length / rowsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                variant="outlined"
                                shape="rounded"
                            />
                        </Stack>
                        <FileUploadModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onUpload={handleFileUpload}
                        />
                    </div>
                </div>

                <table className="all-seller-table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th><span>Sr. No. <IoArrowDownSharp /></span></th>
                            <th><span>Seller Name <IoArrowDownSharp /></span></th>
                            <th> <span>Company Name <IoArrowDownSharp /></span></th>
                            <th><span>Email <IoArrowDownSharp /></span></th>
                            <th><span>Phone Number <IoArrowDownSharp /></span></th>
                            <th><span>Location <IoArrowDownSharp /></span></th>
                            <th><span>HSN Code <IoArrowDownSharp /></span></th>
                            <th><span>Category <IoArrowDownSharp /></span></th>
                            <th><span>Product Name <IoArrowDownSharp /></span></th>
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {displayedSellers.map((seller) => (
                            <React.Fragment key={seller.id}>
                                {seller.products.map((product, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedSellers.includes(seller.id)}
                                                onChange={() => handleCheckboxChange(seller.id)}
                                            />
                                        </td>
                                        <td onClick={() => handleViewSeller(seller.id)}>{seller.id}</td>
                                        <td onClick={() => handleViewSeller(seller.id)}>{seller.contact_person_name}</td>
                                        <td onClick={() => handleViewSeller(seller.id)}>{seller.company_name}</td>
                                        <td onClick={() => handleViewSeller(seller.id)}>{seller.email}</td>
                                        <td onClick={() => handleViewSeller(seller.id)}>{seller.phone_number}</td>
                                        <td onClick={() => handleViewSeller(seller.id)}>{`${seller.city}, ${seller.country}`}</td>
                                        <td onClick={() => handleViewSeller(seller.id)}>{product.hsn_code}</td>
                                        <td onClick={() => handleViewSeller(seller.id)}>{product.category_of_product}</td>
                                        <td onClick={() => handleViewSeller(seller.id)}>{product.product_name}</td>
                                        {/* <td>
                                            <button
                                                className="all-seller-btn view-seller-btn"
                                                onClick={() => handleViewSeller(seller.id)}
                                            >
                                                View
                                            </button>
                                        </td> */}
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSeller;

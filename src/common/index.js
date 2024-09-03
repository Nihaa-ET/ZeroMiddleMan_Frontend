
const backendDomain = "https://zeromiddleman.entroxa.com/api";

const SummaryApi = {
    // Import/Export
    getsellers: {
        url: `${backendDomain}/get_sellers`,
        method: 'GET'
    },
    downloadsellers: {
        url: `${backendDomain}/sellers/download`,
        method: 'GET'
    },
    uploadsellers: {
        url: `${backendDomain}/upload`,
        method: 'POST'
    },

    // Register & Login
    registerUser: {
        url: `${backendDomain}/register`,
        method: 'POST'
    },
    login: {
        url: `${backendDomain}/login`,
        method: 'POST'
    },

    // ActiveUser Routes

    getActiveUsers: {
        url: `${backendDomain}/users`,
        method: 'GET'
    },
    disableDeleteSeller: {
        url: (id) => `${backendDomain}/disable-delete-seller/${id}`,
        method: 'DELETE'
    },


    // DisabledUsers Routes
    getDisabledUsers: {
        url: `${backendDomain}/disabled-users`,
        method: 'GET'
    },
    activateUser: {
        url: (userId) => `${backendDomain}/activate-user/${userId}`,
        method: 'POST'
    },
    disableUser: {
        url: (userId) => `${backendDomain}/disable-user/${userId}`, // Ensure this endpoint matches your API
        method: 'POST'
    },
    updateUser: {
        url: `${backendDomain}/update-user`, // Endpoint for updating user details
        method: 'PATCH'
    },
    deleteUser:{
        url:(userId)=>`${backendDomain}/delete-user/${userId}`,
        method:'DELETE'
    },


    // Trashed Sellers Routes
    gettrashedsellers: {
        url: `${backendDomain}/trashed-sellers`,
        method: 'GET'
    },
    restoreseller: {
        url: `${backendDomain}/restore-deleted-sellers-and-Products`,
        method: 'PUT'
    },
    deleteseller: {
        url: (id) => `${backendDomain}/delete-seller/${id}`,
        method: 'DELETE'
    },
    permanentDelete:{
        url:`${backendDomain}/permanent-delete-sellers`,
        method:'DELETE'
    },

    // Add Seller Route
    addseller: {
        url: `${backendDomain}/add-seller`,
        method: 'POST'
    },

    // Get All Sellers
    getSellersDetails: {
        url: `${backendDomain}/sellers`,
        method: 'GET'
    },
    getSellerById: {
        url: (sellerId) => `${backendDomain}/sellers/${sellerId}`,
        method: 'GET'
      },
      getProductById: {
        url: (sellerId) => `${backendDomain}/products/${sellerId}`, // Make sure this endpoint is correct
        method: 'GET'
      },
    disableAndDeleteSeller: {
        url: (sellerId) => `${backendDomain}/disable-sellers/${sellerId}`,
        method: 'PATCH'
    },
    disableAndDeleteProduct: {
        url: (sellerId) => `${backendDomain}/disable-products/${sellerId}`,
        method: 'PATCH'
    },
    updatesellers: {
        url: (sellerId) => `${backendDomain}/update-sellers/${sellerId}`,
        method: 'PUT'
    },
    updateproducts: {
        url: (sellerId) => `${backendDomain}/update-products/${sellerId}`,
        method: 'PUT'
    },
    getProductsDetails:{
        url:`${backendDomain}/products`,
        method:'GET'
    },
    getAllDisabledSellers:{
         url:`${backendDomain}/deleted-product-sellers`,
        method:'GET'
    },
    getAllSellersAndProductDetails:{
        url:`${backendDomain}/get_sellers`,
        method:'GET'
    },
    deleteSellers:{
        url:`${backendDomain}/delete-sellers`,
        method:'POST'
    },
  
    

    // Admin Routes
    getadmins: {
        url: `${backendDomain}/admins`,
        method: 'GET'
    },
    disableadmin: {
        url: (adminId) => `${backendDomain}/disable-admin/${adminId}`,
        method: 'POST'
    },
    // Product Routes
    addProduct:{
        url:`${backendDomain}/add-product`,
        method:'POST'
    },
    getProduct:{
        url:`${backendDomain}/get-product`,
        method:'GET'
    },

    // Protected Routes
    superadmin: {
        url: `${backendDomain}/superadmin`,
        method: 'GET'
    },
    admin: {
        url: `${backendDomain}/admin`,
        method: 'GET'
    },
    tl: {
        url: `${backendDomain}/tl`,
        method: 'GET'
    },
    editor: {
        url: `${backendDomain}/editor`,
        method: 'GET'
    },
};

export default SummaryApi;

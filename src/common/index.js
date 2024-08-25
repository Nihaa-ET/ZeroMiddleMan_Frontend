const backendDomain = "https://zeromiddleman-api.onrender.com/api";

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

    // Trashed Sellers Routes
    gettrashedsellers: {
        url: `${backendDomain}/trashed-sellers`,
        method: 'GET'
    },
    restoreseller: {
        url: (id) => `${backendDomain}/restore-seller/${id}`,
        method: 'PATCH'
    },
    deleteseller: {
        url: (id) => `${backendDomain}/delete-seller/${id}`,
        method: 'DELETE'
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
        url: (sellerId) => `${backendDomain}/seller/${sellerId}`,
        method: 'GET'
    },
    disableAndDeleteSeller: {
        url: (sellerId) => `${backendDomain}/disable-delete-seller/${sellerId}`,
        method: 'DELETE'
    },
    updatesellers: {
        url: (sellerId) => `${backendDomain}/update-seller/${sellerId}`,
        method: 'PATCH'
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

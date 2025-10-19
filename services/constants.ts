// API Configuration Constants

const SERVER_URL = 'https://r-seeds-backend-production.up.railway.app'

export const API_CONFIG = {
  BASE_URL: SERVER_URL,
  API_VERSION: 'v1',
  TIMEOUT: 60000,
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    SIGNUP: '/auth/register',
  },
  LOAN: {
    ALL: '/loans',
    CURRENT: '/loans/current',
    APPLY: '/loans/apply',
    PRODUCT: `/loan-products`,
    STATISTICS: `/loans/statistics`,
    PAYMENT: '/loans/payment',
    OVERVIEW: '/loans/overview',
  },
  PROJECT: {
    ALL: '/projects',
    DASHBOARD: '/projects/dashboard',
    CREATE: '/projects',
    BY_ID: (id: string | number) => `/projects/${id}`,
    MY_PROJECTS: '/projects/my',
    BY_CATEGORY: (category: string) => `/projects/category/${category}`,
    BY_STATUS: (status: string) => `/projects/status/${status}`,
    TRENDING: '/projects/trending',
    SPOTLIGHT: '/projects/spotlight',
    SEARCH: (title: string) => `/projects/search?title=${title}`,
    UPDATE: (id: string | number) => `/projects/${id}`,
    DELETE: (id: string | number) => `/projects/${id}`,
    STATISTICS: '/projects/statistics',
    OVERVIEW: '/projects/overview',
    UPLOAD: '/upload/projects',
  }, // Worker Management
  USER: {
    ALL: '/users',
    ME: '/users/me',
    GRADUATE: '/users/graduates',
    SPONSORS: '/users/sponsors',
    CREATE: '/users',
    REPORTS: '/worker-reports',
    REPORT: (id: string) => `/worker-reports/${id}`,
    BY_ID: (id: string) => `/projects/workers/${id}`,
    UPDATE: (id: string) => `/projects/workers/${id}`,
    DELETE: (id: string) => `/projects/workers/${id}`,
  },

  ADMIN: {
    // User Management
    USER: {
      ALL: '/admin/users',
      CREATE: '/admin/users',
    },

    // Loan Management
    LOAN: {
      ALL: '/admin/loans',
      APPROVE: (id: string) => `/admin/loans/approve/${id}`,
      REJECT: (id: string) => `/admin/loans/reject/${id}`,
      STATS: '/admin/loans/stats',
      APPROVED: `/admin/loans/approved`,
      UNAPPROVED: '/admin/loans/unapproved',
      UPDATE_STATUS: (id: string) => `/admin/loans/update-status/${id}`,
      BY_ID: (id: string) => `/admin/loans/${id}`
    },

    // Loan Product Management
    LOAN_PRODUCT: {
      ALL: '/admin/loan-products',
      BY_ID: (id: string) => `/admin/loan-products/${id}`,
      CREATE: '/admin/loan-products',
      UPDATE: (id: string) => `/admin/loan-products/${id}`,
      DELETE: (id: string) => `/admin/loan-products/${id}`,
    },



    // Project Management
    PROJECT: {
      ALL: '/admin/projects',
      ANALYTICS: '/admin/projects/analytics',
      BY_ID: (id: string) => `/admin/projects/${id}`,
      STATS: '/admin/projects/stats',
    },

  },
  UPLOAD: {
    BASE: '/upload/image'
  }
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}
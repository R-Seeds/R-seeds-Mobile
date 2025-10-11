// API Configuration Constants

const SERVER_URL = 'https://agrifinance-production.up.railway.app'
// const DEV_MODE = 'http://192.168.22.223:8089'

export const API_CONFIG = {
  BASE_URL: SERVER_URL,
  TIMEOUT: 60000,
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    SIGNUP: '/auth/signup',
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
    UPDATE: (id: string | number) => `/projects/${id}`,
    DELETE: (id: string | number) => `/projects/${id}`,
    STATISTICS: '/projects/statistics',
    OVERVIEW: '/projects/overview',
    GOAL: {
      CREATE: '/projects/goal',
      UPDATE: (id: string) => `/goal/task/${id}`,
      DELETE: (id: string) => `/goal/task/${id}`
    },
    TASK: {
      CREATE: '/projects/task',
      DONE: (id: string) => `/projects/task/done/${id}`,
      UPDATE: (id: string) => `/projects/task/${id}`,
      DELETE: (id: string) => `/projects/task/${id}`
    }
  }, // Worker Management
  WORKERS: {
    ALL: '/projects/workers',
    CREATE: '/projects/worker',
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
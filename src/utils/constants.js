export const API_BASE_URL = 'https://library-backend-vgxl.onrender.com/api';

export const APP_NAME = 'Library Management System';
export const APP_VERSION = '1.0.0';

export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';
export const JWT_EXPIRES_IN = '7d';

export const DEFAULT_PAGE_SIZE = 12;
export const BOOKS_PER_PAGE = 12;
export const USERS_PER_PAGE = 10;
export const BORROWS_PER_PAGE = 15;

export const BOOK_STATUS = {
  AVAILABLE: 'AVAILABLE',
  BORROWED: 'BORROWED',
  DAMAGED: 'DAMAGED',
  LOST: 'LOST',
  CREATED: 'CREATED'
};

export const BORROW_STATUS = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  RETURNED: 'RETURNED',
  OVERDUE: 'OVERDUE',
  CREATED: 'CREATED'
};

export const USER_ROLES = {
  MEMBER: 'member',
  LIBRARIAN: 'librarian',
  ADMIN: 'admin'
};

export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
  CREATED: 'CREATED'
};

export const CARD_STATUS = {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  SUSPENDED: 'SUSPENDED',
  CREATED: 'CREATED'
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; 
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  DISPLAY_TIME: 'dd/MM/yyyy HH:mm',
  API: 'yyyy-MM-dd',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
};

export const SEARCH_DELAY = 300; 
export const MIN_SEARCH_LENGTH = 2;

export const BOOK_CATEGORIES = [
  'Văn học',
  'Khoa học',
  'Lịch sử',
  'Triết học',
  'Tâm lý học',
  'Kinh tế',
  'Công nghệ',
  'Y học',
  'Giáo dục',
  'Nghệ thuật',
  'Thể thao',
  'Du lịch',
  'Nấu ăn',
  'Tôn giáo',
  'Chính trị'
];

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Lỗi kết nối mạng. Vui lòng thử lại.',
  UNAUTHORIZED: 'Bạn không có quyền truy cập.',
  FORBIDDEN: 'Truy cập bị từ chối.',
  NOT_FOUND: 'Không tìm thấy dữ liệu.',
  SERVER_ERROR: 'Lỗi server. Vui lòng thử lại sau.',
  VALIDATION_ERROR: 'Dữ liệu không hợp lệ.',
  LOGIN_REQUIRED: 'Vui lòng đăng nhập để tiếp tục.',
  SESSION_EXPIRED: 'Phiên đăng nhập đã hết hạn.'
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Đăng nhập thành công!',
  REGISTER_SUCCESS: 'Đăng ký thành công!',
  LOGOUT_SUCCESS: 'Đăng xuất thành công!',
  UPDATE_SUCCESS: 'Cập nhật thành công!',
  DELETE_SUCCESS: 'Xóa thành công!',
  CREATE_SUCCESS: 'Tạo mới thành công!',
  BORROW_SUCCESS: 'Mượn sách thành công!',
  RETURN_SUCCESS: 'Trả sách thành công!'
};

export const ROUTES = {
  HOME: '/',
  BROWSE: '/browse',
  BOOK_DETAIL: '/books/:id',
  COLLECTIONS: '/collections',
  COLLECTION_DETAIL: '/collections/:id',
  LOGIN: '/login',
  REGISTER: '/register',
  REGISTER_CARD: '/register-library-card',
  PROFILE: '/profile',
  BORROW_HISTORY: '/borrow-history',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_BOOKS: '/admin/books',
  ADMIN_USERS: '/admin/users',
  ADMIN_BORROWS: '/admin/borrows',
  ADMIN_COLLECTIONS: '/admin/collections',
  NOT_FOUND: '/404'
};

export const STORAGE_KEYS = {
  TOKEN: 'library_token',
  USER: 'library_user',
  THEME: 'library_theme',
  LANGUAGE: 'library_language',
  PREFERENCES: 'library_preferences'
};

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

export const LANGUAGES = {
  VI: 'vi',
  EN: 'en'
};

export const FINE_SETTINGS = {
  DAILY_RATE: 5000,
  MAX_FINE: 500000, 
  GRACE_PERIOD: 3 
};

export const BORROW_LIMITS = {
  MAX_BOOKS_PER_USER: 5,
  BORROW_DURATION_DAYS: 21,
  RENEWAL_LIMIT: 2,
  RENEWAL_DURATION_DAYS: 14
};

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  ADDRESS_MIN_LENGTH: 10,
  ADDRESS_MAX_LENGTH: 200,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  BOOK_ID_LENGTH: 4,
  CARD_ID_LENGTH: 12
};
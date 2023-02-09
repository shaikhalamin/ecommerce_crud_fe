export const API_BASE = process.env.REACT_APP_API_BASE || `http://localhost:8000`;
const STATIC_IMAGES = `${API_BASE}/static/`;
const PRODUCTS_IMAGES = `${API_BASE}/uploads/products/`;

export const API_URLS = {
  base_url: API_BASE,
  static_img: STATIC_IMAGES,
  products_img: PRODUCTS_IMAGES,
  auth: `${API_BASE}/api/v1/auth`,
  product: `${API_BASE}/api/v1/product`,
  users: `${API_BASE}/api/v1/user`,
  storageFile: `${API_BASE}/api/v1/storage-file`,
};

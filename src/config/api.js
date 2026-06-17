/**
 * Configuration constants
 * Centralized environment and API settings
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const config = {
  API_BASE_URL,
  ENDPOINTS: {
    AUTH: {
      LOGOUT: `${API_BASE_URL}/auth/logout`,
      LOGIN: `${API_BASE_URL}/auth/google`,
      STATUS: `${API_BASE_URL}/api/user-status`,
    },
    MESSAGES: {
      SEARCH: `${API_BASE_URL}/messages/search`,
      START: `${API_BASE_URL}/messages/start`,
      SEND: `${API_BASE_URL}/messages/send`,
      GET: `${API_BASE_URL}/messages`,
      UNREAD: `${API_BASE_URL}/messages/unread/count`,
    },
    CHAT: {
      LIST: `${API_BASE_URL}/chat`,
      SEND: `${API_BASE_URL}/chat/send`,
    },
  },
};

export default config;

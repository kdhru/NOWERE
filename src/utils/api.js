/**
 * Centralized JSON fetch wrapper with comprehensive error handling
 * @param {string} url - API endpoint URL
 * @param {object} options - Fetch options
 * @returns {Promise<any>} Parsed JSON response
 */
export async function fetchJson(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const text = await response.text();

    if (!response.ok) {
      const isHtml = /^\s*<!doctype html/i.test(text) || /^\s*<html/i.test(text);
      const message = isHtml
        ? `Server error ${response.status}`
        : text || `Request failed with status ${response.status}`;
      throw new Error(message);
    }

    if (!text.trim()) return null;

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error("Invalid response format from server");
    }

    return JSON.parse(text);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Backend connection failed");
    }
    throw error;
  }
}

import io from "socket.io-client";
import config from "../config/api.js";

let socket = null;

/**
 * Initialize Socket.IO connection
 * @param {string} userId - User ID to join
 * @returns {Socket} Socket instance
 */
export const initSocket = (userId) => {
  if (socket) return socket;

  socket = io(config.API_BASE_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socket.on("connect", () => {
    console.log("Socket connected");
    socket.emit("join", userId);
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  return socket;
};

/**
 * Get existing socket instance
 * @returns {Socket|null} Socket instance or null if not connected
 */
export const getSocket = () => socket;

/**
 * Disconnect socket
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.off();
    socket.disconnect();
    socket = null;
  }
};

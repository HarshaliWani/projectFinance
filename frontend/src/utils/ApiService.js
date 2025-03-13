import axios from "axios";

// Set the backend base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add token to request headers if user is logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth APIs
export const loginAPI = async (userData) => {
  try {
    const response = await API.post("/auth/login", userData);
    console.log("Login API Response:", response.data); // Debugging Line
    return response.data;
  } catch (error) {
    console.error("Login API Error:", error.response?.data || error.message);
    return error.response?.data || { success: false, message: "Error in login request" };
  }
};

// Register API Call
export const registerAPI = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    console.log("Register API Response:", response.data); // Debugging Line
    return response.data;
  } catch (error) {
    console.error("Register API Error:", error.response?.data || error.message);
    return error.response?.data || { success: false, message: "Error in register request" };
  }
};

// Transaction APIs
export const addTransactionAPI = async (transactionData) => {
  try {
    const response = await API.post("/transactions/addTransaction", transactionData);
    console.log("Add Transaction API Response:", response.data); // Debugging Line
    return response.data;
  } catch (error) {
    console.error("Add Transaction API Error:", error.response?.data || error.message);
    return error.response?.data || { success: false, message: "Error in add transaction request" };
  }
};

export const getTransactionsAPI = async () => {
  try {
    const response = await API.get("/transactions/getTransaction");
    console.log("Get Transactions API Response:", response.data); // Debugging Line
    return response.data;
  } catch (error) {
    console.error("Get Transactions API Error:", error.response?.data || error.message);
    return { success: false, message: "Error fetching transactions" };
  }
};

export const deleteTransactionAPI = async (id) => {
  try {
    const response = await API.delete(`/transactions/deleteTransaction/${id}`);
    console.log("Delete Transaction API Response:", response.data); // Debugging Line
    return response.data;
  } catch (error) {
    console.error("Delete Transaction API Error:", error.response?.data || error.message);
    return error.response?.data || { success: false, message: "Error deleting transaction" };
  }
};

export const editTransactionAPI = async (id, transactionData) => {
  try {
    const response = await API.put(`/transactions/updateTransaction/${id}`, transactionData);
    console.log("Edit Transaction API Response:", response.data); // Debugging Line
    return response.data;
  } catch (error) {
    console.error("Edit Transaction API Error:", error.response?.data || error.message);
    return error.response?.data || { success: false, message: "Error editing transaction" };
  }
};

export default API;
// src/Redux/api/apiCalls.jsx

import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "https://nasarna-backend.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Login API
export const loginAPI = async ({ email, password }) => {
  const response = await API.post("users/login", { email, password });
  return response.data; // contains {token, user}
};

// Trustees List API
export const getTrusteesAPI = async () => {
  const response = await API.get("trustees");
  return response.data; // This will be the array of trustee objects
};

// Create Trustee API
export const createTrusteeAPI = async (trusteeData) => {
  const response = await API.post("trustees", trusteeData);
  return response.data; // contains {message, trustee, initialPassword, confirmationMessage, showConfirmation}
};

// Update Trustee API
export const updateTrusteeAPI = async (id, updatedData) => {
  const response = await API.put(`trustees/${id}`, updatedData);
  return response.data; // contains {message, trustee, user}
};

// Delete Trustee API
export const deleteTrusteeAPI = async (id) => {
  const response = await API.delete(`trustees/${id}`);
  return response.data; // contains {message, trustee}
};

// Donors List API
export const getDonorsAPI = async () => {
  const response = await API.get("donors");
  return response.data; // This will return the array of donor objects
};

// Create Donor API
export const createDonorAPI = async (donorData) => {
  const response = await API.post("donors", donorData);
  return response.data; // {message, donor, ...}
};

// ✅ Update Donor API (using _id)
export const updateDonorAPI = async (donorData) => {
  const { _id, ...rest } = donorData; // Extract _id and use rest of the data for update
  const response = await API.put(`donors/${_id}`, rest);
  return response.data; // returns {message, donor, user}
};

// ✅ Toggle Donor Status 
export const toggleDonorStatusAPI = async (_id) => {
  const response = await API.put(`donors/${_id}/toggle-status`);
  return response.data; // {message, donor}
};

// ✅ Delete Donor API (using _id)
export const deleteDonorAPI = async (_id) => {
  const response = await API.delete(`donors/${_id}`);
  return response.data; // {message: "Donor deleted successfully", donor: {...}}
};

// Get Donations List API
export const getDonationsAPI = async () => {
  const response = await API.get("donors");
  return response.data; // This will return the array of donation objects
};

// Causes List API (View Donations)
export const getCausesAPI = async () => {
  const response = await API.get("causes");
  return response.data; // returns an array of cause objects with donation and donor info
};

// Create Cause API
export const createCauseAPI = async (causeData) => {
  const response = await API.post("causes", causeData);
  return response.data; // { name, goal, raised, description, status, _id, ... }
};


// ✅ Delete Cause (using _id)
export const deleteCauseAPI = async (_id) => {
  const response = await API.delete(`causes/${_id}`);
  return response.data; // { message: "Cause deleted successfully", cause: {...} }
};

// ✅ Update Cause API
export const updateCauseAPI = async (causeData) => {
  const { _id, ...rest } = causeData;
  const response = await API.put(`causes/${_id}`, rest);
  return response.data; // returns updated cause object
};

// ✅ Donor Count by Trustee
export const getDonorCountsByTrusteeAPI = async (trusteeIds) => {
  const response = await API.post("donors/donor-counts", { trusteeIds });
  return response.data; // array of { _id, trusteeName, donorCount }
};





import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL;

/**
 * Handles the creation of the task
 * 
 * @param {Object} newTask - The data for the new task to create
 * @returns {Promise<void>} 
 */
const handleCreateTask = async (newTask) => {
  if (!newTask.title || newTask.title.trim() === '') {
    throw new Error('Title is required.');
  }
  await axios.post(`${apiUrl}/tasks`, newTask);
};


/**
 * Fetches the task data from the server
 * 
 * @returns {Promise<void>} 
 */
const fetchTask = async (id) => {
  if (!id || isNaN(Number(id)) || Number(id) <= 0) {
    throw new Error('Invalid task ID provided. ID must be a positive number.');
  }
  const response = await axios.get(`${apiUrl}/tasks/${id}`);
  return response.data;
}

/**
 * Updates a task by ID in the API
 *
 * @param {string} id - The ID of the task to update
 * @param {Object} updatedTask - The updated task data
 * @returns {Promise<void>}
 */
const updateTask = async (id, updatedTask) => {
  if (!id || isNaN(Number(id)) || Number(id) <= 0) {
    throw new Error('Invalid task ID provided. ID must be a positive number.');
  }
  if (!updatedTask || typeof updatedTask !== 'object' || Array.isArray(updatedTask)) {
    throw new Error('Invalid updated task data provided.');
  }
  await axios.put(`${apiUrl}/tasks/${id}`, updatedTask);
};

/**
 * Fetches tasks from the API.
 *
 * @returns {Promise<Array>} - Returns the list of tasks
 */
const fetchTasks = async () => {
  const { data } = await axios.get(`${apiUrl}/tasks`);
  return data; 
}

/**
 * Deletes the specified task by ID
 *
 * @param {number} id - The ID of the task to delete
 * @returns {Promise<void>}
 */
const removeTask = async (id) => {
  await axios.delete(`${apiUrl}/tasks/${id}`);
};

export {
  handleCreateTask,
  fetchTask,
  updateTask,
  fetchTasks,
  removeTask
}
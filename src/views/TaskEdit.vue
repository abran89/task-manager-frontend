<script setup>
import TaskForm from '@/components/TaskForm.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

/**
 * Component for editing an existing task
 * 
 * This component handles fetching and updating
 * the data of a specific task
 *
 * @component TaskEdit
 */

const task = ref({ title: '', description: '' });
const route = useRoute();
const router = useRouter();

const apiUrl = process.env.VUE_APP_API_URL;


/**
 * Fetches the task data from the server
 * 
 * @returns {Promise<void>} 
 */
const fetchTask = async () => {
  try {
    const response = await axios.get(`${apiUrl}/tasks/${route.params.id}`);
    task.value = response.data;
  } catch (error) {
    console.error('Error fetching task:', error);
  }
};

/**
 * Handles the updating of the task
 * 
 * @param {Object} updatedTask - The updated task data
 * @returns {Promise<void>} 
 */
const handleUpdateTask = async (updatedTask) => {
  try {
    await axios.put(`${apiUrl}/tasks/${route.params.id}`, updatedTask);
    router.push({ name: 'TaskManager', query: { message: 'Task updated successfully!' } });
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

onMounted(fetchTask);
</script>

<template>
  <div class="container mt-4">
    <TaskForm :task="task" :isEditing="true" @submit="handleUpdateTask" />
  </div>
</template>
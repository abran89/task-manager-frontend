<script setup>
import TaskForm from '@/components/TaskForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

/**
 * Component for creating a new task
 * 
 * This component handles the creation of a new task,
 * including sending data to the server
 *
 * @component TaskCreate
 */

const task = ref({ title: '', description: '' });
const router = useRouter();

const apiUrl = process.env.VUE_APP_API_URL;

/**
 * Handles the creation of the task
 * 
 * @param {Object} newTask - The data for the new task to create
 * @returns {Promise<void>} 
 */
const handleCreateTask = async (newTask) => {
  try {
    await axios.post(`${apiUrl}/tasks`, newTask);
    router.push({ name: 'TaskManager', query: { message: 'Task created successfully!' } });
  } catch (error) {
    console.error('Error creating task:', error);
  }
};
</script>

<template>
  <div class="container mt-4">
    <TaskForm :task="task" :isEditing="false" @submit="handleCreateTask" />
  </div>
</template>
<script setup>
import TaskForm from '@/components/TaskForm.vue';
import { fetchTask, updateTask } from '@/utils/taskService';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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

const loadTask = async () => {
  try {
    task.value = await fetchTask(route.params.id);
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
    await updateTask(route.params.id, updatedTask);
    router.push({ name: 'TaskManager', query: { message: 'Task updated successfully!' } });
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

onMounted(loadTask);
</script>

<template>
  <div class="container mt-4">
    <TaskForm :task="task" :isEditing="true" @submit="handleUpdateTask" />
  </div>
</template>
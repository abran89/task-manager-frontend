<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TaskForm from '@/components/TaskForm.vue';
import { handleCreateTask } from '@/utils/taskService';

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

const submitTask = async (newTask) => {
  try {
    await handleCreateTask(newTask);
    router.push({ name: 'TaskManager', query: { message: 'Task created successfully!' } });
  } catch (error) {
    alert(error.message || 'Error creating task.');
    console.error('Error creating task:', error);
  }
};
</script>

<template>
  <div class="container mt-4">
    <TaskForm :task="task" :isEditing="false" @submit="submitTask" />
  </div>
</template>
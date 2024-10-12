<script setup>
import { ref, watch } from 'vue';

/**
 * TaskForm component
 * 
 * This component allows users to create or edit tasks.
 * It provides a form to enter a title and a description,
 * and manages the submission of this data
 *
 * @component TaskForm
 * @prop {Object} task - The task to edit or an empty object to create a new task
 * @prop {boolean} isEditing - Indicates if a task is being edited
 */
const props = defineProps({
  task: {
    type: Object,
    required: true,
    default: () => ({ title: '', description: '' }),
    validator: (value) => {
      return typeof value.title === 'string' && typeof value.description === 'string';
    },
  },
  isEditing: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const emit = defineEmits(['submit']);
const formTask = ref({ ...props.task });

watch(() => props.task, (newTask) => {
  formTask.value = { ...newTask };
});

/**
 * Handles the form submission
 * Emits an event with the task data
 *
 * @returns {void}
 */
const handleSubmit = () => {
  emit('submit', { ...formTask.value });
};
</script>

<template>
  <div class="form-container">
    <h1>{{ isEditing ? 'Edit Task' : 'Create Task' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" id="title" class="form-control" v-model="formTask.title" required />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea id="description" class="form-control" v-model="formTask.description"></textarea>
      </div>
      <button type="submit" class="btn btn-primary me-2">
        {{ isEditing ? 'Update Task' : 'Create Task' }}
      </button>
      <button type="button" class="btn btn-warning" @click="$router.push('/tasks')">Cancel</button>
    </form>
  </div>
</template>
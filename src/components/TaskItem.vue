<script setup>
import { defineProps } from 'vue';

/**
 * TaskItem component for displaying a task with edit and delete options
 * 
 * @component
 * @props {Object} task - The task object containing id, title, and description
 * @props {Function} onEdit - Function to handle editing the task
 * @props {Function} onDelete - Function to handle deleting the task
 */
const props = defineProps({
  task: Object,
  onEdit: Function,
  onDelete: Function,
});

/**
 * Edits the task by calling the onEdit function with the task's id
 * 
 * @function editTask
 */
const editTask = () => {
  props.onEdit(props.task.id);
};

/**
 * Deletes the task by calling the onDelete function with the task's id
 * 
 * @function deleteTask
 */
const deleteTask = () => {
  props.onDelete(props.task.id);
};
</script>

<template>
  <tr>
    <td>{{ task.id }}</td>
    <td>{{ task.title }}</td>
    <td>{{ task.description }}</td>
    <td>
      <button class="btn btn-warning me-2" @click="editTask">Edit</button>
      <button class="btn btn-danger" @click="deleteTask">Delete</button>
    </td>
  </tr>
</template>


<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute  } from 'vue-router';
  import TaskList from '../components/TaskList.vue';

  const route = useRoute();
  const statusMessage = ref('');

  /**
 * @function onMounted
 * Executes when the component is mounted
 * Checks if there is a message in the route query
 * Sets the status message if it exists
 * Clears the status message after 2 seconds
 * Removes query parameters from the URL without redirection
 */
onMounted(() => {
  if (route.query.message) {
    statusMessage.value = route.query.message;
    setTimeout(() => {
      statusMessage.value = '';
      window.history.replaceState({}, document.title, window.location.pathname)
    }, 2000);
  }
});
  
</script>

<template>
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1>Tasks</h1>
        <router-link to="/tasks/create" 
        class="btn btn-primary">
          <i class="fas fa-plus me-2"></i> Create Task
        </router-link>
      </div>
      <div v-if="statusMessage" class="alert alert-success" role="alert">
      {{ statusMessage }}
      </div>
      <TaskList />
    </div>
</template>
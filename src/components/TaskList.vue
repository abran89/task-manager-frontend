<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import TaskItem from './TaskItem.vue';

const router = useRouter();

const tasks = ref([]);
const sortAscending = ref(false);

const apiUrl = process.env.VUE_APP_API_URL;

/**
 * Fetches tasks from the API
 * Handles errors in case of failure
 *
 * @async
 * @function getTasks
 * @returns {Promise<void>}
 */
const getTasks = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/tasks`);
    tasks.value = data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

/**
 * Computes sorted tasks based on the sort order
 *
 * @computed
 * @property {Array} sortedTasks - The tasks sorted by ID
 * @returns {Array} - Sorted tasks array
 */
const sortedTasks = computed(() => {
  return [...tasks.value].sort((a, b) => (sortAscending.value ? a.id - b.id : b.id - a.id));
});

/**
 * Toggles the sort order between ascending and descending
 *
 * @function toggleSortOrder
 * @returns {void}
 */
const toggleSortOrder = () => {
  sortAscending.value = !sortAscending.value;
};

/**
 * Navigates to the edit page for the specified task
 *
 * @function editTask
 * @param {number} id - The ID of the task to edit
 * @returns {void}
 */
const editTask = (id) => {
  router.push(`/tasks/edit/${id}`);
};

/**
 * Deletes the specified task after confirmation
 *
 * @async
 * @function deleteTask
 * @param {number} id - The ID of the task to delete
 * @returns {Promise<void>}
 */
const deleteTask = async (id) => {
  if (window.confirm("Are you sure you want to delete this task?")) {
    try {
      await axios.delete(`${apiUrl}/tasks/${id}`);
      tasks.value = tasks.value.filter(task => task.id !== id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
};

onMounted(getTasks);
</script>

<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <button class="btn btn-secondary" @click="toggleSortOrder">
        Sort by ID: {{ sortAscending ? 'Ascending' : 'Descending' }}
      </button>
    </div>
    
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <TaskItem
          v-for="task in sortedTasks"
          :key="task.id"
          :task="task"
          :onEdit="editTask"
          :onDelete="deleteTask"
        />
      </tbody>
    </table>
  </div>
</template>
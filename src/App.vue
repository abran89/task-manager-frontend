<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">TaskManager</RouterLink>
    </div>
  </nav>
  <div class="container mt-4">
    <RouterView />
  </div>
</template>
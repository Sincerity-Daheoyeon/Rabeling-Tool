<template>
  <div class="admin-page-header">
    <div class="breadcrumb">
      <router-link to="/test-management" class="breadcrumb-link">{{ subtitle }}</router-link>
    </div>
    <h1 class="page-title">{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "AdminPageHeader",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    }
  }
});
</script>

<style scoped>
.admin-page-header {
  display: flex;
  padding: 20px;
  color: white;
}

.breadcrumb {
  margin-bottom: 10px;
}

.breadcrumb-link {
  color: #7168F9;
  text-decoration: none;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  color: rgba(255,255,255,0.87); 
}
</style>

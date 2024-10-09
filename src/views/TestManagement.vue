<template>
  <AdminDefaultLayout>
    <div class="test-management">
      <h1>Test Management</h1>
      <div class="test-list">
      </div>
    </div>
  </AdminDefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AdminDefaultLayout from '../layouts/AdminDafaultLayout.vue';

export default defineComponent({
  name: "TestManagement",
  components: {
    AdminDefaultLayout,
  }
});
</script>

<style scoped>
.test-management {
  padding: 20px;
}

.test-list {
  margin-top: 20px;
}
</style>

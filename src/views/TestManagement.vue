<template>
  <AdminDefaultLayout>
    <div class="test-management">
      <h1>Test Management</h1>
      <div class="test-list">
        <!-- 테스트 리스트가 여기에 들어갑니다 -->
      </div>
    </div>
  </AdminDefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AdminDefaultLayout from '../layouts/AdminDefaultLayout.vue';

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

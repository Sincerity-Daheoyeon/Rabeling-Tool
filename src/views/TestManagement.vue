<template>
  <AdminDefaultLayout>
    <div class="test-management">
      <AdminPageHeader title="Reader Test List" subtitle="Test Management" />
      <div class="test-list">
        <!-- 테스트 리스트가 여기에 들어갑니다 -->
      </div>
    </div>
  </AdminDefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AdminDefaultLayout from '../layouts/AdminDefaultLayout.vue';
import AdminPageHeader from '../components/header/AdminPageHeader.vue';

export default defineComponent({
  name: "TestManagement",
  components: {
    AdminDefaultLayout,
    AdminPageHeader,
  }
});
</script>

<style scoped>
.test-management {
  display: flex;
  padding: 20px;
}

.test-list {
  margin-top: 20px;
}
</style>

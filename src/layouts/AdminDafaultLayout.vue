<template>
  <div class="default-layout">
    <NavigationBar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavigationBar from "../components/layout/AdminSideBar.vue"; 

export default defineComponent({
  components: {
    NavigationBar,
  },
});
</script>

<style scoped>
.default-layout {
  display: flex;
}

.content {
  width: calc(100% - 250px);
  background-color: #121212;
  min-height: 100vh;
  color: white;
}
</style>

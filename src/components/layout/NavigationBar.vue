<template>
  <nav class="navigation-bar">
    <div class="left-section">
      dkssuddsfsdfsdfsdf
    </div>
    <div class="right-section">
      <div class="user-info">
        <div class="user-icon"></div>
        <span class="user-name">안녕하세요, 작성자님</span>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavigationBar',
});
</script>

<style scoped>
.navigation-bar {
  width: 100%;
  height: 170px;
  background-color: #1e1e1e; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 15px;
}

.left-section {
  color: #ffffff;
  height: 100%;
}

.right-section {
  display: flex;
  align-items: center;
  height: 100%;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-icon {
  display: flex;
  width: 40px;
  height: 40px;
  background-color: #4b3fa5; 
  border-radius: 50%;
  margin-right: 10px;
}

.user-name {
  display: flex;
  color: #ffffff;
}
</style>

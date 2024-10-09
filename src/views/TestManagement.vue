<template>
  <div class="test-management-container">
    <h1>Test Management Page</h1>
    <p>이 페이지는 테스트 관리 페이지입니다. 여기에 내용을 추가하세요.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TestManagement",
});
</script>

<style scoped>
.test-management-container {
  background-color: #121212;
  color: white;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
}

p {
  font-size: 1.2rem;
  margin-top: 10px;
}
</style>

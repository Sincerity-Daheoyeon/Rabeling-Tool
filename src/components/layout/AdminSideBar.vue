<template>
  <nav class="navigation-bar">
    <ul>
      <li><router-link to="/">Dashboard</router-link></li>
      <li><router-link to="/test-management">Test Management</router-link></li>
      <li><router-link to="/user-management">User Management</router-link></li>
      <li>
        <router-link to="/survey-management">Survey Management</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navigation-bar {
  display: flex;
  width: 250px;
  height: 100vh;
  background-color: #1e1e1e;
  color: white;
}

ul {
  list-style: none;
  padding: 20px;
}

li {
  margin-bottom: 15px;
}

a {
  color: white;
  text-decoration: none;
}

a.router-link-active {
  font-weight: bold;
}
</style>

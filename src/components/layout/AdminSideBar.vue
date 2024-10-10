<template>
  <div class="side-bar">
    <ul>
      <li :class="{ active: isActive('/') }">
        <router-link to="/">
          <i class="icon home-icon"></i> Dashboard
        </router-link>
      </li>
      <li :class="{ active: isActive('/test-management') }">
        <router-link to="/test-management">
          <i class="icon test-icon"></i> Test Management
        </router-link>
      </li>
      <li :class="{ active: isActive('/user-management') }">
        <router-link to="/user-management">
          <i class="icon user-icon"></i> User Management
        </router-link>
      </li>
      <li :class="{ active: isActive('/survey-management') }">
        <router-link to="/survey-management">
          <i class="icon survey-icon"></i> Survey Management
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style scoped>
.side-bar {
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 100vh;
  background-color: #1e1e1e;
  padding: 20px 15px;
  margin : 0px 0px 0px 15px;
  border-radius: 10px;
  font-size: 14px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 10px;
}

a {
  color: #b8b8b8;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 15px;
  transition: background-color 0.3s ease;
}

a.router-link-active,
li.active a {
  background-color: rgba(113, 104, 249, 0.19);
  color: #ffffff;
}

a:hover {
  background-color: rgba(113, 104, 249, 0.19);
}

.icon {
  margin-right: 10px;
  font-size: 1.2rem;
}

.home-icon::before {
  content: '\1F3E0'; 
}

.test-icon::before {
  content: '\1F4CA'; 
}

.user-icon::before {
  content: '\1F464'; 
}

.survey-icon::before {
  content: '\1F527'; 
}
</style>
<template>
  <div class="top">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item active">
            <router-link to="/">總覽 </router-link>
          </li> 
          <li class="nav-item">
            <router-link to="/new">新增 </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "top"
}
</script>

<style lang="scss" scoped>

.top {
  font-size: 1rem;
  width: 600px;
  margin: auto;
  padding: 20px 0px;
}

.top a {
  text-decoration: none;
  color: #777;
  border-right: 1px solid #ccc;
}

.top a:hover {
  color: #000;
}

.top li:last-of-type a {
  border-right: none; 
}
</style>


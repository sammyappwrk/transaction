<template>
  <div id="nav" class="nav_menu">
      <router-link to="/">Home</router-link> |
      <router-link to="/Transaction">Transaction</router-link> | 
      <router-link to="/createTransaction">New Transaction</router-link>
  </div>
  <router-view />
</template>
<style>
.nav_menu {
    text-align: center;
    padding: 10px;
}
</style>
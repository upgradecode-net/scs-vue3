<template>
<div class="container mx-auto">
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link>
    </nav>
</div>

<router-view />
</template>

<script>
export default {
    name: "App",
};
</script>

<style>
  
  </style>

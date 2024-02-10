<template>
  <nav class="deep-purple darken-4">
    <div class="nav-wrapper">
      <router-link class="brand-logo" to="/"><img :src="botLogo" alt="logo" srcset="" width="100" height="50" style="margin-top: 5px"></router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </div>
  </nav>
  <div class="view-container">
    <router-view/>
  </div>
  
</template>

<script>
import botLogo from "@/assets/bot-builder.png"

export default {
  data() {
    return {
      botLogo: botLogo,
    };
  },
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #d1c4e9;
}

.view-container{
  width: 90%;
  margin: 0 auto
}
</style>

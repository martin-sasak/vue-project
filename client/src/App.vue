<template>
  <div id="app">
    <header>
      VUE project
    </header>
    <nav>
      <router-link to="/">Nová zásilka</router-link>
      <router-link to="/consignments">Přehled zásilek</router-link>
    </nav>
    <main>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
  $dark-bg: #24243e;

  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Raleway', sans-serif;
  }
  div {
    box-sizing: border-box;
  }

  header {
    background: linear-gradient(to right, #cb2d3e, #ef473a);
    color: white;
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    font-size: 3rem;
    font-weight: 700;
    padding: 0 2rem;
    height: 5rem;
    z-index: 10;
    box-shadow: 0 0.2rem 3rem rgba(0,0,0, 0.2);
  }
  nav {
    position: fixed;
    top: 5rem;
    width: 8rem;
    background-color: $dark-bg;
    color: white;
    font-size: 1.3rem;
    height: calc(100vh - 5rem);

    a{
      color: white;
      box-sizing: border-box;
      text-align: center;
      padding: 0 1rem;
      height: 7rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;

      &.active {
        background-color: #18182b;
      }
    }
  }
  main {
    background-color: #f2ecec;
    display: flex;
    box-sizing: border-box;
    align-items: stretch;
    padding: 8rem 3rem 3rem 11rem;
    min-height: 100vh;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<template>
  <header></header>
  <aside class="menu">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </aside>
  <main>
    <nav-bar />
    <router-view />
  </main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>

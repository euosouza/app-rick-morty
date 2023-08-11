<template>
  <div class="container">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "../assets/styles/utils.scss";

.container {
  max-width: $container;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>

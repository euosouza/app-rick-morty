<template>
  <div class="error-container">
    <h3>
      <PhXCircle size="128" />
    </h3>
    <p>{{ props.errorMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { PhXCircle } from "@phosphor-icons/vue";
const props = defineProps({
  errorMsg: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.error-container {
  display: grid;
  gap: 1rem;
  text-align: center;
  color: var(--red-500);
  max-width: 450px;
  margin: 0 auto;

  p {
    color: var(--red-500);
    font-weight: bold;
    font-size: 1rem;
  }
}
</style>

<template>
  <Container>
    <div class="wrapper-not-found">
      <img src="../assets/images/not-found.svg" alt="Img página Not Found" />
      <div class="content">
        <p>Página não encontrada</p>
        <p>
          Essa página não está disponivel em nossa aplicação,
          <a href="#">clique aqui</a> para voltar para á página principal.
        </p>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from "@/components/ContainerItem.vue";
</script>

<style lang="scss" scoped>
@import "../assets/styles/utils.scss";
.wrapper-not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 4rem 0;

  .content {
    display: grid;
    gap: 1rem;
    text-align: center;

    p {
      color: var(--gray-600);

      &:first-child {
        font-size: 2rem;
        font-weight: bold;
      }

      &:last-child {
        max-width: 450px;
      }
    }
  }
}
</style>

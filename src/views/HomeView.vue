<template>
  <section id="banner-hero">
    <Container class="wrapper-banner-hero">
      <div class="wrapper-text">
        <h1>
          RM <span>[App]</span> o melhor site pra saber tudo sobre o multiverso
          Rick & Morty.
        </h1>
        <p>
          Acompanhe o cientista alcoólatra Rick e seu neto Morty em aventuras
          interdimensionais cheias de humor, sci-fi e reflexões familiares.
        </p>
        <a class="btn" href="#sobre">Saiba mais</a>
      </div>
      <img src="../assets/images/banner-hero.png" alt="" />
    </Container>
  </section>
</template>

<script setup lang="ts">
import Container from "@/components/ContainerItem.vue";
</script>

<style lang="scss" scoped>
@import "../assets/styles/utils.scss";

#banner-hero {
  .wrapper-banner-hero {
    @include section-container;
    .wrapper-text {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 1rem;
      max-width: 500px;

      a {
        margin-top: 1rem;
        text-decoration: none;

        @include responsiveMin($tablet) {
          width: 240px;
        }
      }
    }

    img {
      width: 100%;
      max-width: 360px;
    }
  }
}
</style>

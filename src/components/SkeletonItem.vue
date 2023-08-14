<template>
  <div class="skeleton">
    <div class="img-skeleton"></div>
    <div class="info-skeleton">
      <div class="title-skeleton"></div>
      <div class="paragraph-skelton"></div>
      <div class="paragraph-skelton"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "../assets/styles/utils.scss";
$height: 180px;
.skeleton {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background-color: var(--white);
  box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.1);
  border-radius: 8px;
  overflow: hidden;
  flex-direction: column;
  width: 100%;
  max-width: 345px;

  @include responsiveMin($mobile) {
    //max-width: 320px;
  }

  @include responsiveMin($tablet) {
    max-width: 345px;
  }

  @include responsiveMin($desktop) {
    max-width: 450px;
  }

  @include responsiveMin($container) {
    height: $height;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
    max-width: 500px;
  }

  .img-skeleton {
    background-color: var(--gray-300);
    width: 100%;
    height: $height;
    position: relative;
    overflow: hidden;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        rgba(#fff, 0) 0,
        rgba(#fff, 0.2) 20%,
        rgba(#fff, 0.5) 60%,
        rgba(#fff, 0)
      );
      animation: animate-skeleton 1s infinite;
      content: "";
    }

    @include responsiveMin($container) {
      width: 200px;
    }
  }

  .info-skeleton {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 16px;
    position: relative;
    overflow: hidden;

    padding: 1.5rem;
    width: 100%;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        rgba(#fff, 0) 0,
        rgba(#fff, 0.2) 20%,
        rgba(#fff, 0.5) 60%,
        rgba(#fff, 0)
      );
      animation: animate-skeleton 1s infinite;
      content: "";
    }

    .paragraph-skelton,
    .title-skeleton {
      background-color: var(--gray-100);
    }
    .paragraph-skelton {
      width: 70%;
      height: 1.4rem;
    }
    .title-skeleton {
      width: 50%;
      height: 2rem;
    }
  }
}

@keyframes animate-skeleton {
  100% {
    transform: translateX(100%);
  }
}
</style>

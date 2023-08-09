<template>
  <header class="header">
    <img src="../assets/images/logo.svg" alt="Logotipo RM[App]" />
    <nav>
      <ul>
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/personagens">Personagens</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.header {
  padding: 1rem 1rem;
  box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.1);

  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    ul {
      list-style-type: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      li {
        color: var(--gray-600);

        a {
          font-size: 1rem;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          padding: 0.2rem;

          &:hover {
            color: var(--purple-500);
            border-bottom: 1px solid var(--purple-500);
          }

          &.router-link-active {
            color: var(--purple-500);
            font-weight: bold;
            border-bottom: 1px solid var(--purple-500);
          }
        }
      }
    }
  }
}
</style>

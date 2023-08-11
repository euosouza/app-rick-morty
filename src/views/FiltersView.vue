<template>
  <section id="filters" class="filters">
    <img
      class="banner-filters"
      src="../assets/images/banner-filtro.jpg"
      alt="Baner página de filtros"
    />
    <Container>
      <div class="wrapper-filtros">
        <form class="container-form" @submit.prevent="handleSubmitSearch">
          <input
            v-model="form.name"
            type="text"
            placeholder="Digite sua pesquisa"
          />

          <select input-status="select" v-model="form.status">
            <option value="" selected disabled>Selecione um status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>

          <button
            type="submit"
            class="btn btn-seach"
            :disabled="isDisabledButton"
          >
            <PhMagnifyingGlass size="16" />
            <span>Pesquisar</span>
          </button>
        </form>
        <div class="text-info-search">
          <p v-if="isDisabledButton">
            Você precisa digitar o nome do personagem ou selecionar o status
            para fazer a pesquisa
          </p>
        </div>
        <Pagination
          v-if="dataPersonagens?.info"
          :info="dataPersonagens.info"
          @next="handleNextPage"
          @prev="handlePrevPage"
        />
        <div v-if="loadindPersonagens" class="loading">Carregando...</div>
        <div v-else-if="errorPersonagens" class="loading">
          {{ errorPersonagens }}
        </div>
        <div v-else class="list-itens">
          <template v-for="personagem in personagens" :key="personagem.id">
            <Card :personagem="personagem" />
          </template>
        </div>
      </div>
      <Pagination
        v-if="dataPersonagens?.info"
        :info="dataPersonagens.info"
        @next="handleNextPage"
        @prev="handlePrevPage"
      />
    </Container>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from "vue";
import { storeToRefs } from "pinia";
import { PhMagnifyingGlass } from "@phosphor-icons/vue";

import Container from "@/components/ContainerItem.vue";
import Card from "@/components/CardItem.vue";
import Pagination from "@/components/PaginationItem.vue";

import { usePersonagensStore } from "@/stores/personagensStore";
import { usePaginacaoStore } from "@/stores/paginacaoStore";
import { useFetch, type SuccessReturnApi } from "@/hooks/useFetch";

interface Form {
  name: string;
  status: "alive" | "dead" | "unknown" | "";
}

const storePersonagens = usePersonagensStore();
const { personagens } = storeToRefs(storePersonagens);

const storePaginacao = usePaginacaoStore();
const { paginacao } = storeToRefs(storePaginacao);

const form = reactive<Form>({ name: "", status: "" });

const resetForm = () => {
  form.name = "";
  form.status = "";
};

const tempSearchPagination = reactive<Form>({ name: "", status: "" });

const isDisabledButton = computed(() => !form.name && !form.status);

const {
  data: dataPersonagens,
  error: errorPersonagens,
  loadind: loadindPersonagens,
  fetchData: fetchDataPersonagens,
} = useFetch<SuccessReturnApi>();

async function handleSubmitSearch() {
  await fetchDataPersonagens({
    url: "/character",
    query: { name: form.name, status: form.status },
  });

  if (dataPersonagens.value) {
    personagens.value = dataPersonagens.value.results;

    storePaginacao.updatesInfoPages({
      next: dataPersonagens.value.info.next,
      prev: dataPersonagens.value.info.prev,
      pages: dataPersonagens.value.info.pages,
    });
  }

  Object.assign(tempSearchPagination, form);
  resetForm();
}

async function handleNextPage() {
  if (paginacao.value.next === 0) return;

  await fetchDataPersonagens({
    url: "/character",
    query: { ...tempSearchPagination, page: paginacao.value.next },
  });

  if (dataPersonagens.value) {
    personagens.value = dataPersonagens.value.results;
  }
}

async function handlePrevPage() {
  if (paginacao.value.prev === 0) return;

  await fetchDataPersonagens({
    url: "/character",
    query: { ...tempSearchPagination, page: paginacao.value.prev },
  });

  if (dataPersonagens.value) {
    personagens.value = dataPersonagens.value.results;
  }
}

onMounted(async () => {
  await fetchDataPersonagens({ url: "/character" });

  if (dataPersonagens.value) {
    personagens.value = dataPersonagens.value.results;

    storePaginacao.updatesInfoPages({
      next: dataPersonagens.value.info.next,
      prev: dataPersonagens.value.info.prev,
      pages: dataPersonagens.value.info.pages,
    });
  }
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/utils.scss";

.filters {
  .banner-filters {
    width: 100%;
    height: 220px;
    object-fit: cover;

    @include responsiveMin($tablet) {
      height: 400px;
    }
  }

  .wrapper-filtros {
    form.container-form {
      display: flex;
      align-items: stretch;
      justify-content: center;
      flex-direction: column;
      gap: 0.5rem;

      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      margin-top: -2rem;

      @include responsiveMin($mobile) {
        flex-direction: row;
      }

      input {
        @include responsiveMin($mobile) {
          flex: 2;
        }
      }

      select {
        @include responsiveMin($mobile) {
          flex: 1;
        }
      }

      input,
      select {
        width: 100%;
        color: var(--gray-600);
        background-color: var(--white);
        border: 1px solid var(--gray-300);
        border-radius: 8px;
        font-size: 1rem;
        padding: 1rem;
      }

      button {
        width: 100%;

        @include responsiveMin($mobile) {
          max-width: 140px;
        }
      }
    }

    .text-info-search {
      text-align: center;
      margin-top: 0.5rem;

      p {
        font-size: 0.75rem;
        color: var(--purple-500);
      }
    }

    .list-itens {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;

      gap: 1.5rem;
      width: 100%;

      .card {
        flex-grow: 1;
      }
    }
  }
}
</style>

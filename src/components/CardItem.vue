<template>
  <div class="card" v-if="personagem">
    <div class="container-img">
      <img :src="personagem.image" alt="Imagem card" />
    </div>
    <div class="container-infos">
      <div class="wrapper-info-primary">
        <h3>{{ personagem.name }}</h3>
        <p>
          <span
            >Condição: <span>{{ personagem.status }}</span>
          </span>
          <span
            >Espécie: <span>{{ personagem.status }}</span></span
          >
        </p>
      </div>

      <div class="wrapper-info-secondary">
        <div class="info-localizacao">
          <p>Ultima localização conhecida:</p>
          <p>{{ personagem.location.name }}</p>
        </div>
        <div class="info-episodio">
          <p>Visto pela primeira vez em:</p>
          <div v-if="loadindEpisode">loadind</div>
          <div v-else-if="errorEpisode">error</div>
          <p v-else>{{ lastEpisod }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { onMounted, ref } from "vue";
import type { Personagem } from "@/models/PersonagensModel";
import { useFetch, type Episode } from "@/hooks/useFetch";

const props = defineProps({
  personagem: { type: Object as PropType<Personagem>, required: true },
});

const {
  data: dataEpisode,
  error: errorEpisode,
  loadind: loadindEpisode,
  fetchData: fetchDataEpisode,
} = useFetch<Episode>();

const lastEpisod = ref("");

onMounted(async () => {
  const url = props.personagem.episode[0].split("/api");
  const urlPath = url[url.length - 1];

  await fetchDataEpisode({ url: urlPath });

  if (dataEpisode.value) {
    lastEpisod.value = dataEpisode.value.name;
  }
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/utils.scss";
$height: 210px;
.card {
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

  .container-img {
    width: 100%;
    height: 250px;

    @include responsiveMin($container) {
      max-width: 200px;
      height: $height;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .container-infos {
    display: grid;
    gap: 16px;

    padding: 1.5rem;

    .wrapper-info-primary {
      h3 {
        margin-bottom: 0.2rem;
      }
      p {
        font-size: 0.875rem;
        color: var(--gray-600);
        display: flex;
        gap: 1rem;
        font-weight: bold;

        span > span {
          font-weight: 400;
        }
      }
    }

    .wrapper-info-secondary {
      display: grid;
      gap: 0.5rem;
      .info-localizacao,
      .info-episodio {
        p {
          font-size: 0.875rem;
          color: var(--gray-600);

          &:first-child {
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>

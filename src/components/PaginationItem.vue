<template>
  <div class="pagination">
    <div class="info-pages">
      <p>
        Página atual: <span>{{ paginacao.current }}</span>
      </p>
      <p>
        Total de páginas: <span>{{ paginacao.pages }}</span>
      </p>
    </div>
    <div class="container-button">
      <button @click="emitPrev" :disabled="isDisabledPrevButton">
        <PhArrowCircleLeft size="32" />
      </button>

      <button @click="emitNext" :disabled="isDisabledNextButton">
        <PhArrowCircleRight size="32" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, type PropType } from "vue";
import { usePaginacaoStore } from "@/stores/paginacaoStore";
import { PhArrowCircleLeft, PhArrowCircleRight } from "@phosphor-icons/vue";
import { storeToRefs } from "pinia";
interface InfoProps {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

const props = defineProps({
  info: { type: Object as PropType<InfoProps>, required: true },
});

const storePaginacao = usePaginacaoStore();
const { paginacao } = storeToRefs(storePaginacao);

const emit = defineEmits(["next", "prev"]);

function emitNext() {
  storePaginacao.updatesInfoPages({
    next: props.info.next,
    prev: props.info.prev,
    pages: props.info.pages,
  });

  emit("next");
}

function emitPrev() {
  storePaginacao.updatesInfoPages({
    next: props.info.next,
    prev: props.info.prev,
    pages: props.info.pages,
  });

  emit("prev");
}

const isDisabledNextButton = computed(() => paginacao.value.next === 0);
const isDisabledPrevButton = computed(() => paginacao.value.prev === 0);

onMounted(() => {
  storePaginacao.updatesInfoPages({
    next: props.info.next,
    prev: props.info.prev,
    pages: props.info.pages,
  });
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/utils.scss";

.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.7rem;
  padding: 0.5rem;
  margin: 2rem 0;
  border-radius: 8px;
  background-color: rgba($color: #e1e1e6, $alpha: 0.5);

  .info-pages {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    p {
      color: var(--gray-600);
      font-size: 0.85rem;
      font-weight: bold;

      span {
        color: var(--purple-500);
      }
    }
  }

  .container-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;

    button {
      background-color: transparent;
      border: none;
      color: var(--purple-500);
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: var(--purple-600);
      }

      &:disabled {
        cursor: not-allowed;
        color: var(--gray-300);
      }
    }
  }
}
</style>

import { ref } from "vue";
import { defineStore } from "pinia";

import type { Personagem } from "@/models/PersonagensModel";

export const usePersonagensStore = defineStore("personagens", () => {
  const personagens = ref<Personagem[]>([]);

  return { personagens };
});

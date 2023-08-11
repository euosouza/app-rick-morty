import { ref } from "vue";

import type { Personagem } from "@/models/PersonagensModel";

export interface Episode {
  id: number;
  name: string;
}

export interface SuccessReturnApi {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Personagem[];
}

interface FetchDataPayload {
  url: string;
  query?: {
    name?: string;
    status?: string;
    page?: number | null;
  };
}

const PAGE_NUMBER_RANDOM = Math.floor(Math.random() * 42);

export function useFetch<T = unknown>() {
  const data = ref<T | null>(null);
  const loadind = ref<boolean>(true);
  const error = ref<string>("");

  function reset() {
    data.value = null;
    loadind.value = true;
    error.value = "";
  }

  function generateUrl({ url, query }: FetchDataPayload) {
    const baseUrl = "https://rickandmortyapi.com/api";
    const newUrlPath = new URL(`/api${url}`, baseUrl);

    if (!query) return newUrlPath;

    if (query.name) {
      newUrlPath.searchParams.set("name", query.name);
    }

    if (query.status) {
      newUrlPath.searchParams.set("status", query.status);
    }

    if (query.page) {
      newUrlPath.searchParams.set("page", query.page.toString());
    }

    return newUrlPath.href;
  }

  async function fetchData({
    url,
    query = { name: "", status: "", page: PAGE_NUMBER_RANDOM },
  }: FetchDataPayload) {
    reset();

    try {
      loadind.value = true;
      const finishedUrl = generateUrl({ url, query });

      const response = await fetch(finishedUrl);

      if (!response.ok) {
        throw new Error();
      }

      data.value = await response.json();
    } catch (err) {
      error.value = "Algum erro aconteceu ao buscar as informações na API.";
    } finally {
      loadind.value = false;
    }
  }

  return {
    data,
    error,
    loadind,
    fetchData,
  };
}

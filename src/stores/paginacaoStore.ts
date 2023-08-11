import { ref } from "vue";
import { defineStore } from "pinia";

interface Paginacao {
  pages: number;
  next: number | null;
  prev: number | null;
  current: number;
}
interface UpdatesInfoPagesParams {
  next: string;
  prev: string;
  pages: number;
}

export const usePaginacaoStore = defineStore("paginacao", () => {
  const paginacao = ref<Paginacao>({
    pages: 0,
    next: null,
    prev: null,
    current: 0,
  });

  function getParamUrl(currentPage: string) {
    if (!currentPage) return 0;
    const params = new URL(currentPage).searchParams;
    const paramPageString = params.get("page");
    return Number(paramPageString);
  }

  function setCurrentPage() {
    if (paginacao.value.next)
      paginacao.value.current = paginacao.value.next - 1;
    else if (paginacao.value.prev)
      paginacao.value.current = paginacao.value.prev + 1;
    else paginacao.value.current = 1;
  }

  function setNextPage(nextUrl: string) {
    // DOC está com as valores trocados
    paginacao.value.prev = getParamUrl(nextUrl);
  }

  function setPrevPage(prevUrl: string) {
    // DOC está com as valores trocados
    paginacao.value.next = getParamUrl(prevUrl);
  }

  function updatesInfoPages({ next, prev, pages }: UpdatesInfoPagesParams) {
    setPrevPage(next);
    setNextPage(prev);
    setCurrentPage();
    paginacao.value.pages = pages;
  }

  return {
    paginacao,
    setNextPage,
    setPrevPage,
    setCurrentPage,
    updatesInfoPages,
  };
});

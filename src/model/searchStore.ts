import { create, type StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { getCoffeeList } from "./coffeeStore";
import { hashStorage } from "../helpers/hashStorage";

type SearchState = {
  searchText?: string;
};

type SearchActions = {
  setSearchText: (text: string) => void;
};

type SearchStore = SearchState & SearchActions;

const searchSlice: StateCreator<
  SearchStore,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set) => ({
  searchText: undefined,
  setSearchText: (text) => {
    set({ searchText: text }, false, "setSearchText");
  },
});

export const useSearchStore = create<SearchStore>()(
  devtools(
    persist(searchSlice, {
      name: "SearchStore",
      storage: createJSONStorage(() => hashStorage),
    }),
    {
      name: "SearchStore",
    }
  )
);

useSearchStore.subscribe((state, prevState) => {
  if (state.searchText !== prevState.searchText) {
    getCoffeeList({ text: state.searchText });
  }
});

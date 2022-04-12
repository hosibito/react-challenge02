import { atom, selector } from "recoil";

export interface Categorie {
    text: string;
}

export const categoryState = atom<Categorie[]>({
    key:"categorys",
    default:[ { text : "Todo"} , {text: "선택"} , {text:"Done"} ],
    effects: [
        ({ setSelf, onSet }) => {
            const todoStoreKey = "categorys";
            const savedValue = localStorage.getItem(todoStoreKey);
            if (savedValue != null) {
                setSelf(JSON.parse(savedValue));
            }
            onSet((newValue, _, isReset) => {
                isReset
                ? localStorage.removeItem(todoStoreKey)
                : localStorage.setItem(
                todoStoreKey,
                JSON.stringify(newValue)
                );
            });
        },
    ],
});

export const selectedCategory = atom<Categorie>({
    key:"selectedCategory",
    default: { text : "Todo"},
});


export interface IToDo {
    text: string;
    id: number;
    category: Categorie;
} 
  
export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects: [
        ({ setSelf, onSet }) => {
            const todoStoreKey = "toDo";
            const savedValue = localStorage.getItem(todoStoreKey);
            if (savedValue != null) {
                setSelf(JSON.parse(savedValue));
            }
            onSet((newValue, _, isReset) => {
                isReset
                ? localStorage.removeItem(todoStoreKey)
                : localStorage.setItem(
                todoStoreKey,
                JSON.stringify(newValue)
                );
            });
        },
    ],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
      const toDos = get(toDoState);
      const currentCategory = get(selectedCategory);  

      return toDos.filter(  (toDo) => toDo.category.text == currentCategory.text  );
   
    },
});



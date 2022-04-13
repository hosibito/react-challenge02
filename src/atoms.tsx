import { atom } from "recoil";

export const isDarkAtom = atom({
    key:"isDark",
    default: true,
});

export interface Categorie {
    text: string;
    index: number;
}

export const categoryState = atom<Categorie[]>({
    key:"categorys",
    default:[ { text : "Todo" , index:0} , {text: "선택", index:1} , {text:"Done", index:2} ],
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


export interface IToDo {
    text: string;
    index: number;
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




import { makeAutoObservable, runInAction } from "mobx";

class LanguageStore {
    language = localStorage.getItem("language");

    constructor() {
        makeAutoObservable(this);
    }

    setLanguage = async (language: string) => {
        runInAction(() => {
            this.language = language;
            localStorage.setItem("language", language);
        });
    };
}

export const store = new LanguageStore();

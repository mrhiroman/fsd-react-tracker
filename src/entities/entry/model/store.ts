import { makeAutoObservable, runInAction } from "mobx";
import {
    Entry,
    getEntry,
    getEntryById,
    updateEntry,
    deleteEntry,
    AddEntry,
    addEntry,
} from "shared";

class EntryStore {
    entryList: Entry[] = [];
    entry?: Entry;
    isLoading = false;
    entryListError = "";
    entryError = "";
    isUpdateLoading = false;
    isRefreshRequired = false;

    constructor() {
        makeAutoObservable(this);
    }

    getEntryList = async () => {
        try {
            this.isLoading = true;

            const data = await getEntry();

            runInAction(() => {
                this.isLoading = false;
                this.entryList = data;
                this.isRefreshRequired = false;
            });
        } catch (err) {
            if (err instanceof Error) {
                runInAction(() => {
                    this.isLoading = false;
                    this.entryListError = err.message;
                    this.isRefreshRequired = false;
                });
            }
        }
    };

    getEntry = async (id: number) => {
        try {
            this.isLoading = true;

            const data = await getEntryById(id);

            runInAction(() => {
                this.isLoading = false;
                this.entry = data;
            });
        } catch (err) {
            if (err instanceof Error) {
                runInAction(() => {
                    this.isLoading = false;
                    this.entryError = err.message;
                });
            }
        }
    };

    addEntry = async (entry: AddEntry) => {
        try {
            await addEntry(entry);
        } catch (err) {
            throw err;
        }
    };

    updateEntry = async (entry: Entry) => {
        try {
            this.isUpdateLoading = true;
            await updateEntry(entry);

            this.isUpdateLoading = false;
        } catch (err) {
            this.isUpdateLoading = false;
            throw err;
        }
    };

    deleteEntry = async (id: number) => {
        try {
            await deleteEntry(id);
        } catch (err) {
            throw err;
        }
    };

    requireRefresh = async () => {
        runInAction(() => {
            this.isRefreshRequired = true;
        });
    };
}

export const store = new EntryStore();

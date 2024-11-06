import { entryStore } from "entities/entry";

export const removeEntry = (id: number) => {
    const {
        store: { deleteEntry },
    } = entryStore;

    deleteEntry(id);
};

import { entryStore } from "entities/entry";
import { Entry } from "shared";

export const updateEntry = (entry: Entry) => {
    const {
        store: { updateEntry },
    } = entryStore;

    updateEntry(entry);
};

import { entryStore } from "entities/entry";

export const addEntry = (status: "new" | "inwork" | "completed") => {
    const {
        store: { addEntry },
    } = entryStore;

    addEntry({ name: "New entry", description: "Description", status: status });
};

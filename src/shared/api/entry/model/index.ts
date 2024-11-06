export type Entry = {
    id: number;
    name: string;
    description: string;
    status: "new" | "inwork" | "completed";
};

export type AddEntry = {
    name: string;
    description: string;
    status: "new" | "inwork" | "completed";
};

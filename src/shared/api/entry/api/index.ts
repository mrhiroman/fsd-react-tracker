import { AddEntry, Entry, httpClient } from "shared/api";

const SLUG = "entry";

export const getEntry = () => httpClient.get(SLUG).json<Entry[]>();

export const getEntryById = (id: number) =>
    httpClient.get(`${SLUG}/${id}`).json<Entry>();

export const addEntry = (entry: AddEntry) =>
    httpClient.post(`${SLUG}`, { json: entry }).json();

export const updateEntry = (entry: Entry) =>
    httpClient.put(`${SLUG}/${entry.id}`, { json: entry }).json<Entry>();

export const deleteEntry = (id: number) =>
    httpClient.delete(`${SLUG}/${id}`).json();

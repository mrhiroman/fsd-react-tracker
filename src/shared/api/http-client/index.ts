import ky from "ky";

export const httpClient = ky.create({
    prefixUrl: "https://6726158c302d03037e6c5320.mockapi.io/api",
});

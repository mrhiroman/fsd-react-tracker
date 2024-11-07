import { DetailsPage, ListPage } from "pages";
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "shared/ui";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <ListPage />,
            },
            {
                path: ":id",
                element: <DetailsPage />,
            },
        ],
    },
]);

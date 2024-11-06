import { DetailsPage } from "pages/details-page";
import { ListPage } from "pages/list-page";
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

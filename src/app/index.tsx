import { RouterProvider } from "react-router-dom";
import { router } from "./providers";

export const App = () => {
    return <RouterProvider router={router} />;
};

import { RouterProvider } from "react-router-dom";
import { router, i18n } from "./providers";
import { I18nextProvider } from "react-i18next";

export const App = () => {
    return (
        <I18nextProvider i18n={i18n}>
            <RouterProvider router={router} />
        </I18nextProvider>
    );
};

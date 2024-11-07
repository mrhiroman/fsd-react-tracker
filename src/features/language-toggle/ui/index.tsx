import { Radio } from "antd";
import { i18n } from "app/providers";
import { languageStore } from "features/language-toggle";

export const LanguageToggle = () => {
    const {
        store: { language, setLanguage: setStoreLanguage },
    } = languageStore;

    const setLanguage = (language: string) => {
        i18n.changeLanguage(language);
        setStoreLanguage(language);
    };

    return (
        <Radio.Group
            defaultValue={language}
            onChange={(e) => setLanguage(e.target.value)}
            buttonStyle="solid"
        >
            <Radio.Button value="en">English</Radio.Button>
            <Radio.Button value="ru">Русский</Radio.Button>
        </Radio.Group>
    );
};

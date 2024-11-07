import { Button, Result, Space, Spin, Modal, Input } from "antd";
import { entryStore } from "entities/entry";
import { updateEntry } from "features";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

export const DetailsPage = observer(() => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [refreshRequest, setRefreshRequest] = useState(false);

    const {
        store: {
            getEntry,
            isLoading,
            entryError,
            entry,
            requireRefresh,
            deleteEntry: apiDeleteEntry,
        },
    } = entryStore;

    const { t } = useTranslation();

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        id ? getEntry(parseInt(id)) : navigate("/");
    }, [id, refreshRequest]);

    if (entryError) {
        return <Result title={entryError} />;
    }

    const deleteEntry = () => {
        Modal.confirm({
            title: t("Do you want to delete this entry?"),
            content: t("This action is irreversible"),
            cancelText: t("Cancel"),
            okText: t("Delete"),
            onOk() {
                id && apiDeleteEntry(parseInt(id));
                setTimeout(() => requireRefresh(), 300);
                navigate("/");
            },
        });
    };

    const openEditModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (entry) {
            updateEntry({
                id: entry?.id,
                status: entry?.status,
                description: description,
                name: name,
            });
            setTimeout(() => setRefreshRequest(true), 300);
            setTimeout(() => requireRefresh(), 300);
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Space
            direction="vertical"
            align="start"
            style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                padding: "24px",
            }}
        >
            {isLoading ? (
                <Spin />
            ) : (
                <>
                    <Button type="primary" onClick={() => navigate("/")}>
                        {t("Go back")}
                    </Button>
                    <Space
                        direction="vertical"
                        align="center"
                        style={{ width: "calc(100vw - 48px)" }}
                    >
                        <h1>{entry?.name}</h1>
                        <p>{entry?.description}</p>
                        <Button type="primary" onClick={() => openEditModal()}>
                            {t("Edit")}
                        </Button>
                        <Button type="primary" onClick={() => deleteEntry()}>
                            {t("Delete")}
                        </Button>
                    </Space>

                    <Modal
                        title={t("Edit entry")}
                        open={isModalOpen}
                        cancelText={t("Cancel")}
                        okText={t("Save")}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <Input
                            placeholder={entry?.name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            placeholder={entry?.description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Modal>
                </>
            )}
        </Space>
    );
});

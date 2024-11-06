import { Button, Result, Space, Spin, Modal, Input } from "antd";
import { entryStore } from "entities/entry";
import { updateEntry } from "features";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
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
            title: "Do you want to delete this entry?",
            content: "This action is irreversible",
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
                justifyContent: "start",
                padding: "24px",
            }}
        >
            {isLoading ? (
                <Spin />
            ) : (
                <>
                    <Button type="primary" onClick={() => navigate("/")}>
                        Go back
                    </Button>
                    <Space direction="vertical" align="start">
                        <h1>{entry?.name}</h1>
                        <p>{entry?.description}</p>
                    </Space>
                    <Button type="primary" onClick={() => openEditModal()}>
                        Edit
                    </Button>
                    <Button type="primary" onClick={() => deleteEntry()}>
                        Delete
                    </Button>
                    <Modal
                        title="Edit entry"
                        open={isModalOpen}
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

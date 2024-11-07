import { Button, Flex, Result, Space, Spin } from "antd";
import { EntryCard, entryStore } from "entities/entry";
import { addEntry, LanguageToggle, updateEntry } from "features";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Status } from "shared";

export const ListPage = observer(() => {
    const {
        store: {
            getEntryList,
            isLoading,
            entryListError,
            entryList,
            requireRefresh,
            isRefreshRequired,
        },
    } = entryStore;

    const { t } = useTranslation();

    useEffect(() => {
        if (entryList.length === 0 || isRefreshRequired) {
            getEntryList();
        }
    }, [entryList, isRefreshRequired]);

    if (entryListError) {
        return <Result title={entryListError} />;
    }

    const addNewEntry = (status: "new" | "inwork" | "completed") => {
        addEntry(status);
        setTimeout(() => requireRefresh(), 300);
    };

    const draggedRef = useRef(-1);
    const draggedOverRef = useRef<Status | null>(null);

    const updateStatus = () => {
        if (draggedRef.current !== -1 && draggedOverRef.current != null) {
            const entry = entryList.find((e) => e.id === draggedRef.current);
            if (entry)
                updateEntry({
                    id: entry.id,
                    description: entry.description,
                    name: entry.name,
                    status: draggedOverRef.current,
                });
            setTimeout(() => requireRefresh(), 300);
        }
    };

    return (
        <>
            <Space
                direction="horizontal"
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
                        {["new", "inwork", "completed"].map((x, i) => {
                            return (
                                <Space
                                    direction="vertical"
                                    align="center"
                                    style={{ width: "250px" }}
                                    key={i}
                                    onDragEnter={() =>
                                        (draggedOverRef.current = x as Status)
                                    }
                                >
                                    <h2>
                                        {x.charAt(0).toUpperCase() + x.slice(1)}
                                    </h2>
                                    <Space
                                        direction="vertical"
                                        align="center"
                                        style={{
                                            border: "1px solid black",
                                            padding: "12px",
                                            borderRadius: "8px",
                                        }}
                                    >
                                        {entryList
                                            .filter((e) => e.status === x)
                                            .map((entry) => (
                                                <EntryCard
                                                    key={entry.id}
                                                    entry={entry}
                                                    onDragStart={() =>
                                                        (draggedRef.current =
                                                            entry.id)
                                                    }
                                                    onDragEnd={() =>
                                                        updateStatus()
                                                    }
                                                />
                                            ))}
                                        <Button
                                            color="primary"
                                            //@ts-ignore mapped type is the same, Todo: refactor to enum and use "x as Status"
                                            onClick={() => addNewEntry(x)}
                                        >
                                            {t("Add new")}
                                        </Button>
                                    </Space>
                                </Space>
                            );
                        })}
                    </>
                )}
            </Space>
            <Flex justify="center">
                <LanguageToggle />
            </Flex>
        </>
    );
});

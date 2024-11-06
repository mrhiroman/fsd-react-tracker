import { Card, Space } from "antd";
import { DragEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Entry } from "shared";

type Props = {
    entry: Entry;
    action?: ReactNode;
    onDragStart: DragEventHandler;
    onDragEnd: DragEventHandler;
};

export const EntryCard = ({ entry, action, onDragStart, onDragEnd }: Props) => {
    return (
        <Card
            style={{ width: "200px" }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <Space>
                {action}
                <Link to={`/${entry.id}`}>{entry.name}</Link>
            </Space>
        </Card>
    );
};

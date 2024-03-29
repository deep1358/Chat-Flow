import React, { useState, useEffect, memo } from "react";
import { BsChatDots } from "react-icons/bs";

import SettingsPanel from "../SettingsPanel";

import "./styles.css";

export default memo(({ selectedNode, changeNodeLabel }) => {
    /**
     * This method will set data type to reactflow when dragging start
     * @param {object} event - Javascript event type
     * @param {string} nodeType - Type of the node (e.g. default)
     */
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

    // Open settings panel for selected node
    useEffect(() => {
        if (selectedNode) setSettingsPanelOpen(true);
    }, [selectedNode]);

    return (
        <aside>
            {settingsPanelOpen ? (
                <SettingsPanel
                    selectedNode={selectedNode}
                    changeNodeLabel={changeNodeLabel}
                    setSettingsPanelOpen={setSettingsPanelOpen}
                />
            ) : (
                <div
                    onDragStart={(event) => onDragStart(event, "default")}
                    draggable
                    className="msg"
                >
                    <div className="msg-icon">
                        <BsChatDots size={40} />
                    </div>
                    <p className="msg-test">Message</p>
                </div>
            )}
        </aside>
    );
});

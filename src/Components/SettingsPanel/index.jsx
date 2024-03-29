import React, { useState, useEffect, memo } from "react";
import { BsArrowLeft } from "react-icons/bs";

import "./styles.css";

export default memo(
    ({ selectedNode, changeNodeLabel, setSettingsPanelOpen }) => {
        useEffect(() => {
            setInputMessage(selectedNode?.data?.label || "");
        }, [selectedNode]);

        const [inputMessage, setInputMessage] = useState(
            selectedNode?.data?.label || ""
        );

        return (
            <div className="settings-panel">
                <div className="settings-panel-header">
                    <BsArrowLeft
                        style={{ cursor: "pointer" }}
                        onClick={() => setSettingsPanelOpen(false)}
                    />
                    <p>Message</p>
                </div>
                <div className="settings-panel-edit-message">
                    <p>Text</p>
                    <textarea
                        rows={4}
                        value={inputMessage}
                        onChange={(e) => {
                            setInputMessage(e.target.value);
                            changeNodeLabel(selectedNode?.id, e.target.value);
                        }}
                    />
                </div>
            </div>
        );
    }
);

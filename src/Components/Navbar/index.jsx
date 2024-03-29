import React, { memo } from "react";

import "./styles.css";

export default memo(({ onSave }) => {
    return (
        <div className="navbar">
            <button className="save-button" onClick={onSave}>
                Save Changes
            </button>
        </div>
    );
});

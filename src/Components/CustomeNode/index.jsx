import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { BsChatDots } from "react-icons/bs";
import { AiOutlineWhatsApp } from "react-icons/ai";

import "./styles.css";

export default memo((props) => {
    const {
        data: { label },
        isConnectable,
        id,
    } = props;

    return (
        <div className="custom-node" id={id}>
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
            />
            <div className="custom-node-header">
                <div className="custom-node-header-msg">
                    <BsChatDots size={10} />
                </div>
                <p>Send Message</p>
                <div className="custom-node-header-whatsapp">
                    <AiOutlineWhatsApp />
                </div>
            </div>
            <div className="custom-node-label">
                <p>{label}</p>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
            />
        </div>
    );
});

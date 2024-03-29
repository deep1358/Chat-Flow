import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
    useNodesState,
    ReactFlowProvider,
    useEdgesState,
    addEdge,
    MarkerType,
} from "reactflow";
import { ToastContainer, toast } from "react-toastify";

import CustomNode from "./Components/CustomeNode";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";

import "reactflow/dist/style.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

const nodeTypes = {
    default: CustomNode,
};

const App = () => {
    // If localstorage has no stored flow, then use below node as initial node
    const initialNodes = [
        {
            id: "1",
            type: "default",
            data: { label: "Initial text" },
            position: { x: 250, y: 5 },
        },
    ];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    /**
     * Whenever selectedNode variable has any node, then settings panel will be opened for that node.
     * Issue:-
     *    Whenever any node is deselected, by clicking remaining part of flow, then I'm trying to listen to that event.
     *    To listen that event, I used onClick in ReactFlow element, but because of this onNodeClick in getting called.
     *    And in onClick, I'm not getting which node is selected, so that's causing issue.
     *    So because of this behaviour, I'm unable to close settings panel, when node is getting deselected.
     *    So to close settings panel, one has to click on back icon as of now.
     */
    const [selectedNode, setSelectedNode] = useState(null);

    /**
     * Fetch stored flow from the localstorage if available when application loads very first time.
     * And set nodes and edges accordingly
     */
    useEffect(() => {
        const storedFlow = JSON.parse(localStorage.getItem(flowKey));
        if (storedFlow) {
            const { nodes, edges } = storedFlow;
            setNodes(nodes || []);
            setEdges(edges || []);
        }
    }, []);

    /**
     * This method will connect the two nodes.
     * @param {object} params - Object of reactFlowInstance
     */
    const onConnect = useCallback(
        (params) => {
            // Can not have multiple edge originating from the same node
            // Check if edge already exists
            if (edges.some((edge) => edge.source === params.source)) return;

            setEdges((eds) =>
                addEdge(
                    {
                        ...params,
                        markerEnd: {
                            type: MarkerType.ArrowClosed,
                        },
                    },
                    eds
                )
            );
        },
        [edges]
    );

    /**
     * This method is used when node is being dragged
     * @param {object} event - Javascript event type
     */
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    /**
     * This method is used when node is getting dropped.
     * @param {object} event - Javascript event type
     */
    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData("application/reactflow");

            // check if the dropped element is valid
            if (typeof type === "undefined" || !type) {
                return;
            }
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: `chatnode_${Date.now()}`, // Generate unique ID all the time
                type,
                position,
                data: { label: "test message" },
            };

            setNodes((nds) => nds.concat(newNode));

            // Open settings panel for the new node
            setSelectedNode(newNode);
        },
        [reactFlowInstance]
    );

    /**
     * This method will save the current flow to the localstorage.
     */
    const onSave = useCallback(() => {
        if (reactFlowInstance) {
            // Checking if more than one Node has empty target handles
            const { nodes, edges } = reactFlowInstance.toObject();
            const moreThanOneNodesWithEmptyTargetHandles = nodes.filter(
                (node) =>
                    edges.filter((edge) => edge.target === node.id).length === 0
            );
            if (moreThanOneNodesWithEmptyTargetHandles.length > 1) {
                toast.error("Cannot save flow", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }

            const flow = reactFlowInstance.toObject();
            // When storing to the localstorage, setting selected attribute of all nodes to false
            const storedFlow = {
                ...flow,
                nodes: flow.nodes.map((node) => ({
                    ...node,
                    selected: false,
                })),
            };
            localStorage.setItem(flowKey, JSON.stringify(storedFlow));
            toast.success("Saved flow", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        }
    }, [reactFlowInstance]);

    /**
     * This method will select the node
     * @param {object} e - Javascript event type
     * @param {object} node - Node
     */
    const onNodeClick = (_e, node) => {
        setSelectedNode(node);
    };

    // Key to store flow in localstorage
    const flowKey = "chat-flow";

    /**
     * This method will change the selected node's text according to the text is being written in textarea in settings panel.
     * @param {string} id - ID of the Node
     * @param {string} label - New label of the Node
     */
    const changeNodeLabel = useCallback(
        (id, label) => {
            const newNodes = nodes.map((node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            label: label,
                        },
                    };
                }
                return node;
            });
            setNodes(newNodes);
        },
        [nodes]
    );

    return (
        <>
            <ToastContainer />

            <Navbar onSave={onSave} />

            <div className="dndflow">
                <ReactFlowProvider>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        nodeTypes={nodeTypes}
                        fitView
                        onNodeClick={onNodeClick}
                    ></ReactFlow>

                    <Sidebar
                        selectedNode={selectedNode}
                        changeNodeLabel={changeNodeLabel}
                    />
                </ReactFlowProvider>
            </div>
        </>
    );
};

export default App;

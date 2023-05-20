/* eslint-disable react-hooks/exhaustive-deps */
import React, {
	useState,
	useCallback,
	useRef,
	useContext,
	useEffect,
} from "react";
import ReactFlow, {
	ReactFlowProvider,
	addEdge,
	useNodesState,
	useEdgesState,
	Background,
} from "reactflow";
import { isEqual } from "lodash";

import { Context } from "../../shared/context/Context";

import MessageNode from "../Nodes/MessageNode/Message";

import "./FlowCanvas.scss";
import "reactflow/dist/style.css";

// All the custom nodes should be included here
// so that it can be available in the node types of react flow
const nodeTypes = { message: MessageNode };

function FlowCanvas() {
	const {
		allNodes,
		allEdges,
		selectedNode,
		updateNode,
		updateAllNodes,
		updateAllEdges,
		isSaved,
		updateSaved,
	} = useContext(Context);

	const [nodes, setNodes, onNodesChange] = useNodesState(allNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	// Drag-n-drop state
	const [reactFlowInstance, setReactFlowInstance] = useState(null);
	const reactFlowWrapper = useRef(null);

	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[]
	);

	// Here, the local nodes will be synced with the context nodes
	// once the save button is pushed
	useEffect(() => {
		if (isSaved) {
			setNodes(allNodes);
			updateSaved(false);
		}
	}, [isSaved]);

	// On every node/edge change we want to update the nodes/
	// edges stored in the context
	useEffect(() => {
		if (!isEqual(allNodes, nodes)) updateAllNodes(nodes);
		if (!isEqual(allEdges, edges)) updateAllEdges(edges);
	}, [nodes, edges]);

	const onDragOver = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	const onDrop = useCallback(
		(event) => {
			event.preventDefault();

			const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
			const type = event.dataTransfer.getData("application/reactflow");

			// check if the dropped element is valid
			if (typeof type === "undefined" || !type) return;

			const position = reactFlowInstance.project({
				x: event.clientX - reactFlowBounds.left,
				y: event.clientY - reactFlowBounds.top,
			});
			const newNode = {
				id: `${new Date().getTime()}`, // unique ID generation
				type,
				position,
				data: `Test Message 1`, // can also take objects
			};

			setNodes((nds) => nds.concat(newNode));
		},
		[reactFlowInstance]
	);

	// Here, we are handling the node click to show the settings
	// panel. So, if there is already a selected node and we are
	// clicking the same node then toggle the setting panel else
	// update the selected node
	const onNodeClick = (event, node) =>
		updateNode(selectedNode?.id !== node?.id ? node : null);

	const onElementRemove = () => updateNode(null);

	return (
		<div className="flowCanvas">
			<ReactFlowProvider>
				<div className="reactflow-wrapper" ref={reactFlowWrapper}>
					<ReactFlow
						nodes={nodes}
						edges={edges}
						nodeTypes={nodeTypes}
						snapToGrid={true}
						onInit={setReactFlowInstance}
						onNodesChange={onNodesChange}
						onNodeClick={onNodeClick}
						onEdgesChange={onEdgesChange}
						onConnect={onConnect}
						onDrop={onDrop}
						onDragOver={onDragOver}
						onNodesDelete={onElementRemove}
					>
						<Background />
					</ReactFlow>
				</div>
			</ReactFlowProvider>
		</div>
	);
}

export default FlowCanvas;

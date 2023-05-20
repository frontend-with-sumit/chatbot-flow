import React, { useContext } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";

import { Context } from "../../shared/context/Context";

import Settings from "../SettingsComponent/Settings";

import "./NodesPanel.scss";

// Here, we are storing information of all the nodes in the nodes panel
// type property is important here as this will make it a custom node
// its value is determined by the key of nodeTypes mentioned in the flowCanvas component
const NODES = [
	{
		id: 1,
		title: "Message",
		icon: <BsFillChatDotsFill className="icon" />,
		type: "message",
	},
];

function NodesPanel() {
	const { selectedNode } = useContext(Context);

	// Drag-n-drop
	const onDragStart = (event, nodeType) => {
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<div className="nodesPanel">
			{selectedNode ? (
				<Settings />
			) : (
				NODES.map((node) => (
					<div
						key={node?.id}
						className="node node-message"
						onDragStart={(e) => onDragStart(e, node?.type)}
						draggable
					>
						<span>{node?.icon}</span>
						<span>{node?.title}</span>
					</div>
				))
			)}
		</div>
	);
}

export default NodesPanel;

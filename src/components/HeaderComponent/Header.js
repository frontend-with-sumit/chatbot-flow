import React, { useContext } from "react";
import toast from "react-hot-toast";

import { Context } from "../../shared/context/Context";

import "./Header.scss";

function Header() {
	const {
		allEdges,
		allNodes,
		selectedNode,
		updateNode,
		updateAllNodes,
		updateSaved,
	} = useContext(Context);

	// Here, we are handling two cases
	// Firstly, if there is any selected node then this function
	// will save the edited text of the node
	// Secondly, when there are more than one nodes and either all
	// or some are disconnected
	const handleSave = () => {
		if (selectedNode) {
			const nodesClone = [...allNodes];
			const node = nodesClone.find((n) => n?.id === selectedNode?.id);
			node.data = selectedNode?.data;

			updateAllNodes(nodesClone);
			updateSaved(true);
			updateNode(null);
			toast.success("Changes saved");
		} else if (allNodes.length > 1 && allNodes.length - 1 !== allEdges.length)
			toast.error("Cannot save Flow");
		else toast.success("Flow saved");
	};

	return (
		<header className="header">
			<button
				className="btn btn-outline-primary"
				onClick={handleSave}
				disabled={allNodes.length === 0}
			>
				Save Changes
			</button>
		</header>
	);
}

export default Header;

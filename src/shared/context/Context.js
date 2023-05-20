import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
	const [nodes, setNodes] = useState([]);
	const [edges, setEdges] = useState([]);
	const [selectedNode, setSelectedNode] = useState(null);
	const [isSaved, setIsSaved] = useState(false);

	return (
		<Context.Provider
			value={{
				allNodes: nodes,
				allEdges: edges,
				selectedNode,
				updateNode: setSelectedNode,
				updateAllNodes: setNodes,
				updateAllEdges: setEdges,
				isSaved,
				updateSaved: setIsSaved,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;

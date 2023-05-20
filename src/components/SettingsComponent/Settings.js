/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

import { Context } from "../../shared/context/Context";

import "./Settings.scss";

function Settings() {
	const { selectedNode, updateNode } = useContext(Context);

	const [node, setNode] = useState();

	// Here, the node is being synced with the selected node in context
	useEffect(() => {
		setNode(selectedNode);
	}, [selectedNode]);

	// Here, we want to update the node stored in the context
	// only if the prev node data and current node data is
	// different
	useEffect(() => {
		if (selectedNode && node && selectedNode?.data !== node?.data)
			updateNode(node);
	}, [node]);

	const handleNodeChange = (e) =>
		setNode((n) => ({
			...n,
			data: e.target.value,
		}));

	return (
		<div className="settings">
			<div className="settings-header">
				<MdOutlineKeyboardBackspace
					className="icon icon-back"
					onClick={() => updateNode(null)}
				/>
				<p>Message</p>
			</div>
			<div className="settings-form">
				<div className="form-group">
					<label htmlFor="node">Text</label>
					<textarea id="node" value={node?.data} onChange={handleNodeChange} />
				</div>
			</div>
		</div>
	);
}

export default Settings;

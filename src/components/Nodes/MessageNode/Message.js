import React, { memo, useContext } from "react";
import { Handle, Position } from "reactflow";
import { FaWhatsapp } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";

import { Context } from "../../../shared/context/Context";

import "./Message.scss";

// node styling
const nodeStyles = { transform: "scale(2.5)" };

function MessageNode({ id, data }) {
	const { selectedNode } = useContext(Context);

	return (
		<div>
			<Handle style={nodeStyles} type="target" position={Position.Left} />
			<div className={`messageNode ${id === selectedNode?.id && "active"}`}>
				<div className="nodeHeader">
					<p className="nodeTitle">
						<BsFillChatDotsFill className="icon" />
						<span>Send Message</span>
					</p>
					<span>
						<FaWhatsapp className="icon icon-whatsapp" />
					</span>
				</div>
				<div className="nodeContent">
					<p>{data}</p>
				</div>
			</div>
			<Handle style={nodeStyles} type="source" position={Position.Right} />
		</div>
	);
}

export default memo(MessageNode);

import ContextProvider from "./shared/context/Context";

import FlowCanvas from "./components/FlowCanvasComponent/FlowCanvas";
import Header from "./components/HeaderComponent/Header";
import NodesPanel from "./components/NodesPanelComponent/NodesPanel";
import Toast from "./shared/components/ToastComponent/Toast";

import "./App.scss";

function App() {
	return (
		<div className="wrapper">
			<Toast />
			<ContextProvider>
				<Header />
				<main>
					<div className="content">
						<div className="canvas">
							<FlowCanvas />
						</div>
						<div className="panel">
							<NodesPanel />
						</div>
					</div>
				</main>
			</ContextProvider>
		</div>
	);
}

export default App;

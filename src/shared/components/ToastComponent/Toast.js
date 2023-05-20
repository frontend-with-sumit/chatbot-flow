import React from "react";
import { Toaster } from "react-hot-toast";

function Toast() {
	return (
		<Toaster
			toastOptions={{
				error: {
					style: {
						background: "#fbccca",
					},
					iconTheme: {
						primary: "#fff",
						secondary: "#fbccca",
					},
				},
			}}
		></Toaster>
	);
}

export default Toast;

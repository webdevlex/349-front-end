import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Hero from "./components/Hero";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { AuthProvider } from "./context/AuthContext";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<div className="App">
					<Routes>
						<Route path="/" element={<Hero />} />
						<Route path="/search" element={<Home />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/signin" element={<SignIn />} />
					</Routes>
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;

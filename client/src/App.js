import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import OfflineBoard from './pages/OfflineBoard/OfflineBoard';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/offline" element={<OfflineBoard />} />
			</Routes>
		</Router>
	);
}

export default App;

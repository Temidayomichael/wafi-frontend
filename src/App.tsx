import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Home from './pages'
import ProtectedRoute from './components/protectedRoute'

function App() {
	const user = localStorage.getItem('user')
	const isLoggedIn = user ? true : false

	console.log(user, isLoggedIn)

	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/dashboard'
						element={
							<ProtectedRoute auth={isLoggedIn}>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Router>
		</div>
	)
}

export default App

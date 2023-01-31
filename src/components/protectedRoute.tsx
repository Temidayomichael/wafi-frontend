import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({
	auth,
	children,
}: {
	auth: boolean
	children: any
}) {
	return auth ? children : <Navigate to='/' />
}

import React from 'react'
import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { axiosInstance } from '../utils/axiosUtility'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Home() {
	const navigate = useNavigate()
	const formik = useFormik({
		initialValues: {
			userName: '',
		},
		validationSchema: Yup.object({
			userName: Yup.string().required('Please enter your username'),
		}),
		onSubmit: async (values) => {
			axiosInstance
				.post(`users/${values.userName}`, {
					balance: 0,
				})
				.then((res) => {
					const { data } = res
					console.log({
						userName: data.user.username,
						token: data.token,
					})
					localStorage.setItem(
						'user',
						JSON.stringify({
							userName: data.user.username,
							token: data.token,
						}),
					)
					navigate('/dashboard')
					toast.success('Welcome')
				})
				.catch((err) => {
					console.log(err)
					toast.error('Something went wrong')
				})
		},
	})

	return (
		<Container className='text-light'>
			<h1 className='header mb-3'>Welcome to WE-FI test</h1>
			<div className='main-body'>
				<form onSubmit={formik.handleSubmit}>
					<Form.Label className='mt-3'>Please enter your username</Form.Label>
					<InputGroup className='mt-10'>
						<InputGroup.Text id='basic-addon1'>@</InputGroup.Text>
						<Form.Control
							id='userName'
							name='userName'
							type='text'
							onChange={formik.handleChange}
							value={formik.values.userName}
							placeholder='Username'
							aria-label='Username'
							aria-describedby='basic-addon1'
						/>
					</InputGroup>
					<div>
						<Form.Text className='text-danger'>
							{formik.errors.userName &&
								formik.touched.userName &&
								formik.errors.userName}
						</Form.Text>
					</div>
					<Button type='submit' className='mt-3' variant='primary'>
						Enter
					</Button>
				</form>
			</div>
		</Container>
	)
}

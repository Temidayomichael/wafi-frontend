import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { axiosInstance } from '../utils/axiosUtility'
import { useNavigate } from 'react-router-dom'
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap'
import { useState } from 'react'

export default function Transfer({ balance }: { balance: number }) {
	const navigate = useNavigate()
	const data = localStorage.getItem('user')
	const user = JSON.parse(data ?? '')

	const [isLoading, setIsLoading] = useState(false)

	const formik = useFormik({
		initialValues: {
			amount: '',
			userName: '',
		},
		validationSchema: Yup.object({
			amount: Yup.string().required('Please enter your amount'),
			userName: Yup.string().required('Please enter your amount'),
		}),
		onSubmit: async (values) => {
			axiosInstance
				.post(
					`send?from_username=${user.userName}&to_username=${values.userName}&amount=${values.amount}`,
					{
						balance: 0,
					},
				)
				.then((res) => {
					setIsLoading(true)
					if (+values.amount > balance) {
						toast.error('Insufficient funds')
					} else {
						const { data } = res
						console.log({
							amount: data.amount,
						})
						navigate('/dashboard')
						toast.success('Welcome')
						window.location.reload()
						setIsLoading(false)
					}
				})
				.catch((err) => {
					console.log(err)
					toast.error('Something went wrong')
					setIsLoading(false)
				})
		},
	})
	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<Form.Label className='mt-3'></Form.Label>

				<div>
					<InputGroup className='mt-10'>
						<InputGroup.Text id='basic-addon1'>To</InputGroup.Text>
						<Form.Control
							id='userName'
							name='userName'
							type='text'
							onChange={formik.handleChange}
							value={formik.values.userName}
							placeholder='userName'
							aria-label='userName'
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
				</div>
				<div className='mt-3'>
					<InputGroup className='mt-10'>
						<InputGroup.Text id='basic-addon1'>$</InputGroup.Text>
						<Form.Control
							id='amount'
							name='amount'
							type='text'
							onChange={formik.handleChange}
							value={formik.values.amount}
							placeholder='amount'
							aria-label='amount'
							aria-describedby='basic-addon1'
						/>
					</InputGroup>
					<div>
						<Form.Text className='text-danger'>
							{formik.errors.amount &&
								formik.touched.amount &&
								formik.errors.amount}
						</Form.Text>
					</div>
				</div>
				{isLoading ? (
					<Spinner
						as='span'
						animation='border'
						size='sm'
						role='status'
						aria-hidden='true'
					/>
				) : (
					<Button type='submit' className='mt-3' variant='primary'>
						Submit
					</Button>
				)}
			</form>
		</>
	)
}

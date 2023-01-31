import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { axiosInstance } from '../utils/axiosUtility'
import { Button, Form, InputGroup } from 'react-bootstrap'

export default function Deposit() {
	const data = localStorage.getItem('user')
	const user = JSON.parse(data ?? '')

	const formik = useFormik({
		initialValues: {
			amount: '',
		},
		validationSchema: Yup.object({
			amount: Yup.string().required('Please enter your amount'),
		}),
		onSubmit: async (values) => {
			axiosInstance
				.post(`deposit?username=${user.userName}&amount=${values.amount}`)
				.then((res) => {
					const { data } = res
					console.log({
						amount: data.amount,
					})
					window.location.reload()
					toast.success('Welcome')
				})
				.catch((err) => {
					console.log(err)
					toast.error('Something went wrong')
				})
		},
	})
	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<Form.Label className='mt-3'>Please enter amount</Form.Label>
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
				<Button type='submit' className='mt-3' variant='primary'>
					Submit
				</Button>
			</form>
		</>
	)
}

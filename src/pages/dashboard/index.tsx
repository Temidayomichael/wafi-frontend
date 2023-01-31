import { useEffect, useState } from 'react'
import { Container, Spinner, Tab, Tabs } from 'react-bootstrap'
import Deposit from '../../components/deposit'
import Transfer from '../../components/transfer'
import { axiosInstance } from '../../utils/axiosUtility'
import { toast } from 'react-toastify'

export default function Dashboard() {
	const [amount, setAmount] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const data = localStorage.getItem('user')
	const user = JSON.parse(data ?? '')

	useEffect(() => {
		setIsLoading(true)

		axiosInstance
			.get(`balance?username=${user.userName}`)
			.then((res) => {
				console.log(res)
				setAmount(res.data.balance)
				setIsLoading(false)
			})
			.catch((err) => {
				console.log(err)
				toast.error('Something went wrong')
				setIsLoading(false)
			})
	}, [])

	return (
		<>
			<Container className='text-light'>
				{isLoading ? (
					<Spinner animation='grow' />
				) : (
					<>
						<h1 className='header mb-3'>Hi {user.userName}</h1>
						<h3 className='mb-3'>Balance: ${amount ? amount : 0}</h3>
						<div className='main-body'>
							<Tabs
								defaultActiveKey='profile'
								id='uncontrolled-tab-example'
								className='mb-3'>
								<Tab eventKey='Deposit' title='Deposit'>
									<Deposit />
								</Tab>
								<Tab eventKey='Transfer' title='Transfer'>
									<Transfer balance={amount} />
								</Tab>
							</Tabs>
						</div>
					</>
				)}
			</Container>
		</>
	)
}

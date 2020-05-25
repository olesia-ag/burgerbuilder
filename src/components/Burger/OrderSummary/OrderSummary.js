import React from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends React.Component {
// componentWillUpdate (){
// 	console.log('order summary will update')
// }

	render() {	
		const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
		return (
			<li key={igKey}>
				<span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
				{this.props.ingredients[igKey]}
			</li>
		)
	})
		return (
		<Aux>
			<h3> Your order</h3>
			<p>burger with following ingredients:</p>
			<ul>
                {ingredientSummary}
                </ul>
				<p>Total price: {this.props.price.toFixed(2)}</p>
                <p>Continue to checkout:</p>
				<Button btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
				<Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
		</Aux>
	)
	}

	
}

export default OrderSummary

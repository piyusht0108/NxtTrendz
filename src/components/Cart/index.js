import {Component} from 'react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

class Cart extends Component {
  state = {isPaymentSelected: false, confirmOrder: false}

  onChangePayment = () => {
    this.setState(prevState => ({
      isPaymentSelected: !prevState.isPaymentSelected,
    }))
  }

  onConfirmOrder = () => {
    this.setState({confirmOrder: true})
  }

  render() {
    const {confirmOrder, isPaymentSelected} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value
          const showEmptyView = cartList.length === 0
          const cartLength = cartList.length
          const onClickRemoveAll = () => {
            removeAllCartItems()
          }
          let totalPrice = 0
          cartList.map(eachItem => {
            totalPrice += eachItem.quantity * eachItem.price
            return eachItem
          })
          return (
            <>
              <Header />
              <div className="cart-container">
                {showEmptyView ? (
                  <EmptyCartView />
                ) : (
                  <div className="cart-content-container">
                    <h1 className="cart-heading">My Cart</h1>
                    <button
                      type="button"
                      className="remove-all-button"
                      onClick={onClickRemoveAll}
                    >
                      Remove All
                    </button>
                    <CartListView />
                    <div className="summary-container">
                      <h1 className="total-text">
                        Order Total:
                        <span className="bill-amount"> Rs {totalPrice}/-</span>
                      </h1>
                      <p className="count-text">{cartLength} items in cart</p>
                      <Popup
                        trigger={
                          <button type="button" className="button">
                            Checkout
                          </button>
                        }
                        modal
                        nested
                      >
                        {close => (
                          <div className="modal">
                            {confirmOrder ? null : (
                              <button
                                type="button"
                                className="close"
                                onClick={close}
                              >
                                &times;
                              </button>
                            )}

                            <div className="header"> Payment </div>
                            {confirmOrder ? (
                              <div className="content" id="content">
                                <p className="modal-heading">
                                  Your order has been placed successfully
                                </p>
                              </div>
                            ) : (
                              <div className="content" id="content">
                                <h1>Checkout</h1>
                                <h3 className="modal-heading">
                                  Total: {totalPrice}
                                </h3>
                                <h3 className="modal-heading">
                                  No of Items: {cartList.length}
                                </h3>
                                <div className="paymentContainer">
                                  <h4 className="modal-heading">
                                    Payment Method:
                                  </h4>
                                  <div>
                                    <input
                                      id="creditCard"
                                      type="radio"
                                      name="payment"
                                      disabled
                                    />
                                    <label htmlFor="creditCard">
                                      Credit Card
                                    </label>
                                    <br />
                                    <input
                                      id="debitCard"
                                      type="radio"
                                      name="payment"
                                      disabled
                                    />
                                    <label htmlFor="debitCard">
                                      Debit Card
                                    </label>
                                    <br />
                                    <input
                                      id="netBanking"
                                      type="radio"
                                      name="payment"
                                      disabled
                                    />
                                    <label htmlFor="netBanking">
                                      Net Banking
                                    </label>
                                    <br />
                                    <input
                                      id="cod"
                                      type="radio"
                                      name="payment"
                                      onChange={this.onChangePayment}
                                    />
                                    <label htmlFor="cod">
                                      Cash On Delivery
                                    </label>
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="actions">
                              {confirmOrder ? (
                                <Link to="/products">
                                  <button
                                    type="button"
                                    className="shop-now-btn"
                                    onClick={onClickRemoveAll}
                                  >
                                    Close
                                  </button>
                                </Link>
                              ) : (
                                <button
                                  type="button"
                                  id="confirmButton"
                                  className="button"
                                  onClick={this.onConfirmOrder}
                                  disabled={!isPaymentSelected}
                                >
                                  Confirm Order
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </Popup>
                    </div>
                  </div>
                )}
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart

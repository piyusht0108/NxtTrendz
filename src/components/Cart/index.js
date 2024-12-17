import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      const cartLength = cartList.length
      const onClickRemoveAll = () => {
        removeAllCartItems()
      }
      let totalPrice = 0
      for (let cartItem of cartList) {
        totalPrice += cartItem.quantity * cartItem.price
      }

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
                  <button type="button" className="checkout-button">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart

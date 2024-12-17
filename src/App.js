import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachItem => eachItem.id !== id),
    }))
  }

  addCartItem = product => {
    const {cartList} = this.state
    const newCartList = [...cartList]

    if (newCartList.length !== 0) {
      const cartIdList = newCartList.map(eachItem => eachItem.id)
      if (cartIdList.includes(product.id)) {
        const updatedCartList = newCartList.map(eachItem => {
          let updatedItem = {}
          if (eachItem.id === product.id) {
            updatedItem = {
              ...product,
              quantity: eachItem.quantity + product.quantity,
            }
          } else {
            updatedItem = {...eachItem}
          }
          return updatedItem
        })
        this.setState({cartList: updatedCartList})
      } else {
        this.setState(prevState => ({
          cartList: [...prevState.cartList, product],
        }))
      }
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  increaseCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        let updatedItem = {}
        if (eachItem.id === id) {
          updatedItem = {...eachItem, quantity: eachItem.quantity + 1}
        } else {
          updatedItem = {...eachItem}
        }
        return updatedItem
      }),
    }))
  }

  decreaseCartItem = (id, quantity) => {
    if (quantity === 1) {
      this.removeCartItem(id)
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          let updatedItem = {}
          if (eachItem.id === id) {
            updatedItem = {...eachItem, quantity: eachItem.quantity - 1}
          } else {
            updatedItem = {...eachItem}
          }
          return updatedItem
        }),
      }))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.increaseCartItem,
          decrementCartItemQuantity: this.decreaseCartItem,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

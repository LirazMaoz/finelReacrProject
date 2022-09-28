import './App.css'
import NavBar from './components/navBar'
import { ToastContainer } from 'react-toastify'
import Footer from './components/footer'
import Home from './components/home'
import About from './components/about'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/signup'
import 'react-toastify/dist/ReactToastify.css'
import Signin from './components/signin'
import { Component } from 'react'
import userService from './services/userService'
import Logout from './components/logout'
import BusinessSignup from './components/signupBusiness'
import CreateCard from './components/createCard'
import ProtectedRoute from './components/common/protectedRoute'
import MyCards from './components/myCards'
import DeleteCard from './components/deleteCard'
import EditCard from './components/editCard'
import Announcement from './components/Announcement'
// Screens
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import ItemScreen from './screens/ItemScreen'
import ForgetPassword from './components/forgetPassword'
import ResetPassword from './components/resetPassword'
class App extends Component {
  state = {}

  componentDidMount() {
    this.setState({
      user: userService.getUser(),
    })
  }
  render() {
    const { user } = this.state
    return (
      <div className="App">
        <div className="app d-flex flex-column min-vh-100">
          <ToastContainer />
          <header>
            <NavBar user={user} />
            <Announcement />
          </header>
          <main className="container flex-fill">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route
                path="/my-cards/edit/:id"
                element={
                  <ProtectedRoute bizOnly>
                    <EditCard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-cards/delete/:id"
                element={
                  <ProtectedRoute bizOnly>
                    <DeleteCard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-card"
                element={
                  <ProtectedRoute bizOnly>
                    <CreateCard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-cards"
                element={
                  <ProtectedRoute bizOnly>
                    <MyCards />
                  </ProtectedRoute>
                }
              />
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/signin" element={<Signin />}></Route>
              <Route path="/signup-biz" element={<BusinessSignup />}></Route>
              <Route path="/logout" element={<Logout />}></Route>
              <Route path="/items" element={<ItemScreen />}></Route>
              <Route exact path="/product/:id" element={<ProductScreen />} />

              <Route
                exact
                path="/cart"
                element={
                  <ProtectedRoute bizOnly>
                    <CartScreen />
                  </ProtectedRoute>
                }
              />
              <Route exact path="/item" element={<ItemScreen />} />

              <Route path="/forget-password" element={<ForgetPassword />} />
              {
                <Route
                  path="/reset-password"
                  element={<ResetPassword />}
                ></Route>
              }
            </Routes>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    )
  }
}

export default App

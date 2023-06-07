import React, { Component } from "react"
import  LoginPage  from "./LoginPage/LoginPage"
import  RegisterPage  from "./RegisterPage/RegisterPage"
import ForgotPasswordPage from "./ForgottenPasswordPage/ForgottenPassword";
import HomePage from "./HomePage/HomePage"
import { createRoot } from "react-dom/client"
import {BrowserRouter as Router, Routes, Route, HashRouter} from "react-router-dom"
import UserDashboard from "./UserDashboard/UserDashboard"

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage  />} />
            <Route path="/user-dashboard/:content" element={<UserDashboard />} />
          </Routes>
        </HashRouter>
      </div>
      //  <Router>
      //    <Routes>
      //           <Route path="/user-dashboard/:content" element={<UserDashboard />} />
      //          <Route exact path="/" element={<LoginPage />} />
      //     </Routes>
      //   </Router>
    )
  }
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)
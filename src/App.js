import React, { useContext } from "react";
import Auth, { LoginComponent, SignupComponent } from "./components/Auth/Auth";
import UploadComponent from "./components/Upload/Upload";
import GalleryComponent from "./components/Gallery/Gallery";
import HomepageLayout from "./components/Containers/Layout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "./App.css";
import { SessionContext } from "./hooks/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { state } = useContext(SessionContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        state.session ? (
          <HomepageLayout>{children}</HomepageLayout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const App = () => {
  return (
    <Auth>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginComponent />
            <Link to="/signup">Sign up</Link>
          </Route>
          <Route path="/signup">
            <SignupComponent />
            <Link to="/login">Login</Link>
          </Route>
          <PrivateRoute path="/about">
            <About />
          </PrivateRoute>
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/upload">
            <UploadComponent />
          </PrivateRoute>
          <PrivateRoute path="/gallery">
            <GalleryComponent />
          </PrivateRoute>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    </Auth>
  );
};

const About = () => {
  return (
    <div className="App">
      <div>
        <div>About</div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="App">
      <div>
        <div>Home</div>
      </div>
    </div>
  );
};

export default App;

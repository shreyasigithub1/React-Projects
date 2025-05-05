import { useState } from "react";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: "",
    };
  }

  //this function toggles between login and logout
  buttonHandle() {
    this.setState((prevState) => {
      if (prevState.isLoggedIn) {
        // Logging out → reset user value
        return {
          isLoggedIn: false,
          user: "",
        };
      } else {
        // Logging in → just toggle login
        return {
          isLoggedIn: true,
        };
      }
    });
  }
  

  render() {
    return (
      <>
        {this.state.isLoggedIn ? (
          <input
            type="text"
            placeholder="Type your name"
            value={this.state.user}
            onChange={(e) =>
              this.setState({
                user: e.target.value,
              })
            }
          />
        ) : null}
        <h2>{this.state.isLoggedIn?`Hello ${this.state.user}!`:"Hello User!"}</h2>
        <button onClick={() => this.buttonHandle()}>
          {this.state.isLoggedIn ? "Logout" : "Login"}
        </button>
      </>
    );
  }
}

export default App;

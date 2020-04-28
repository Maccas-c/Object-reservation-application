import React, { Component, Fragment } from 'react';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  render() {
    return (
      <Fragment>
        <h1>Toolbar</h1>
        <h1>SideDrawer</h1>
        <main>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;

import React from "react";

class Runner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Eater ID
      rid: this.props.rid,
      email: this.props.email,
      firstName: this.props.first,
      lastName: this.props.last
    };
  }
}
export default Runner;

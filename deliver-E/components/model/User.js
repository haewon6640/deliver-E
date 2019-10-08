import React from "react";

class Eater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Eater ID
      eid: this.props.eid,
      email: this.props.email,
      firstName: this.props.first,
      lastName: this.props.last
    };
  }
}

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

export default { Eater, Runner };

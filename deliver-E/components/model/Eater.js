import React from "react";
export default Eater;
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

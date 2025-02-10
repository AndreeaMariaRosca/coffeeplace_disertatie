import React from "react";
import Coffee from "./Coffee";

export class CoffeeList extends React.Component {
  handleSave = (updatedCoffee) => {
    // Update the coffee on the server
    this.props.onSaveCoffee(updatedCoffee);
  };

  render() {
    return this.props.tableData.map((item) => (
      <Coffee {...item} key={item._id} onSave={this.handleSave} />
    ));
  }
}
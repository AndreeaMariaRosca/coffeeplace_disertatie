import React from "react";
import Beverage from "./Beverage";

export class BeverageList extends React.Component {

  render() {
    return this.props.tableData.map((item) => (
      <Beverage {...item} key={item._id}/>
    ));
  }
}
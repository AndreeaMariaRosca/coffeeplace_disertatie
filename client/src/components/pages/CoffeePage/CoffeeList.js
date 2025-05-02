import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import Coffee from "./Coffee";

export class CoffeeList extends React.Component {
  handleSave = (updatedCoffee) => {
    this.props.onSaveCoffee(updatedCoffee);
  };

  render() {
    return (
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={6}
        px={{ base: 4, md: 8 }}
        py={6}
      >
        {this.props.tableData.map((item) => (
          <Coffee {...item} key={item._id} onSave={this.handleSave} />
        ))}
      </SimpleGrid>
    );
  }
}

import React from "react";
import Beverage from "./Beverage";
import { SimpleGrid } from "@chakra-ui/react";

export class BeverageList extends React.Component {

  render() {
    return (
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={6}
        px={{ base: 4, md: 8 }}
        py={6}>
        {this.props.tableData.map((item) => (
          <Beverage {...item} key={item._id} />
        ))}
      </SimpleGrid>
    )
  }
}
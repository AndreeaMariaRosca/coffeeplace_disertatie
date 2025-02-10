import React from "react";
import { VStack } from "@chakra-ui/react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Layout from "../../navbar/Layout";
import { getPersonalityCoffee } from "../../../utils/drinksApi";
import "../index.css";
import RecipesList from "./RecipesList";

export default class RecipePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
    };
  }

  render() {
    return (
      <Layout>
        <div className="drinks">
          <VStack spacing={20}>
            <RecipesList
              tableData={this.state.tableData}
            />
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={this.state.pageCount}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </VStack>
        </div>
      </Layout>
    );
  }

  componentDidMount() {
    getPersonalityCoffee();
  }

}

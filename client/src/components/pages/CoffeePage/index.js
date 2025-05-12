import React from "react";
import { VStack } from "@chakra-ui/react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Layout from "../../navbar/Layout";
import { CoffeeList } from "./CoffeeList";
import { getCoffees } from "../../../utils/drinksApi";
import "../index.css";

export default class CoffeePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 13,
      currentPage: 0,
    };

    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleSaveCoffee = this.handleSaveCoffee.bind(this);
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadMoreData();
      }
    );
  };

  loadMoreData() {
    const data = this.state.orgtableData;

    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData: slice,
    });
  }

  handleSaveCoffee(updatedCoffee) {
    axios
      .put(`/api/coffees/${updatedCoffee._id}`, updatedCoffee)
      .then(() => {
        const updatedTableData = this.state.orgtableData.map((coffee) =>
          coffee._id === updatedCoffee._id ? updatedCoffee : coffee
        );
        this.setState({
          orgtableData: updatedTableData,
        }, this.loadMoreData);
      })
      .catch((err) => {
        console.error("Error updating coffee:", err);
      });
  }

  render() {
    return (
      <Layout>
        <div className="drinks">
          <VStack spacing={20}>
            <CoffeeList
              tableData={this.state.tableData}
              onSaveCoffee={this.handleSaveCoffee}
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
    this.getData();
  }

  getData() {
    getCoffees().then((tdata) => {
      const slice = tdata.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.setState({
        pageCount: Math.ceil(tdata.length / this.state.perPage),
        orgtableData: tdata,
        tableData: slice,
      });
    });
  }
}

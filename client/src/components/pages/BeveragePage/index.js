import React from "react";
import { VStack } from "@chakra-ui/react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Layout from "../../navbar/Layout";
import { BeverageList } from "./BeverageList";
import { getBeverages } from "../../../utils/drinksApi";
import "../index.css";
import Profil from "../Profil";

export default class BeveragePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 10,
      currentPage: 0,
    };

    this.handlePageClick = this.handlePageClick.bind(this);
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



  render() {
    return (
      <Layout>
        <div className="drinks">
          <VStack spacing={20}>
            <BeverageList
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
    this.getData();
  }

  getData() {
    getBeverages().then((tdata) => {
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

import React, { Component } from "react";
import CompanyDetailSecondaryNavbar from "./Common/CompanyDetailSecondaryNavbar";
import {
  getCompanyDetailById,
  getSimilarTable,
  getDropDownData,
} from "../actions/CompanyDetail";
import { connect } from "react-redux";
import { classBody } from "@babel/types";
import Table from "./Common/TickerTable";

export class CompanyDetailAnalysis extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;

    console.log("From analysis component", id);
    this.props.getCompanyDetailById(id);
  }

  render() {
    console.log(this.props.similar_company ? this.props.similar_company : "NA");
    return (
      <div>
        {/* checking whether the data has been loaded into the reducer and if it is then getSimilarTabl which will have a parameter sector from the data loaded in the reducer  */}
        <CompanyDetailSecondaryNavbar />
        <div style={{ width: "1000px", margin: "auto" }}>
          {this.props.similar_company["0"] ? (
            <>
              {console.log(this.props.similar_company["0"].similar_sector_data)}
              <Table
                tableHeaders={[
                  "Ticker",
                  "Dividends",
                  "Market Cap",
                  "Net Profit",
                  "P/E ratio",
                  "Share Price",
                  "ROCE%",
                ]}
                tableData={this.props.similar_company["0"]}
              />
            </>
          ) : (
            <p>Loadin </p>
          )}
        </div>
        <select
          type="text"
          id="stocks_dropdown"
          name="sector"
          // value={this.state.sector}
          // onChange={this.OnSelectSector}
        >
          {this.props.drop_down_data.map(companies => (
            <>
              <option name="choice">{companies.ticker_name}</option>
            </>
          ))}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.CompanyDetailReducer.company,
  similar_company: state.CompanyDetailReducer.similar_company,
  drop_down_data: state.CompanyDetailReducer.drop_down_data,
});
export default connect(mapStateToProps, {
  getCompanyDetailById,
  getSimilarTable,
  getDropDownData,
})(CompanyDetailAnalysis);

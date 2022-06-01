import React, { useEffect, useState } from "react";
import { Tab, Tabs, Form, Button, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";

interface IProps {}
const Doctor: React.FunctionComponent<IProps> = (props) => {
  const [searchDate, setSearchDate] = useState<Date | null>(new Date());
  const [slots, setSlots] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("slots")) {      
      let data = localStorage.getItem("slots");
      setSlots(JSON.parse(data || "{}"));
    }
  }, []);
  return (
    <div>
      <div className="d-flex py-3 px-2 groups-title-wrap align-content-center">
        <span className="bar-wrap">
          <i className="fa fa-bars"></i>
        </span>
        <h3 className="groups-title pl-2 pt-1">Appointment Slots ({slots.length})</h3>
      </div>
      <div className="table-search-wrap">
        <div className="row mb-3 mx-3">
          <div className="col-8">
            <input
              type="search"
              className="search w-100"
              placeholder="Search"
            />
          </div>
          <div className="col-4">
            <div className="d-flex table-date-wrap">
              <DatePicker
                className="table-date"
                selected={searchDate}
                minDate={new Date()}
                onChange={(date: Date) => {
                  setSearchDate(date);
                }}
              />
              <Button variant="btn btn-search" className="btn-table-wrap">
                Search
              </Button>
            </div>
          </div>
        </div>
        <Table responsive="sm" className="main-table-wrap">
          <thead>
            <tr>
              <th>#</th>
              <th>Slot Timing</th>
              <th>Seating Capacity </th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {slots.length > 0 &&
              slots.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{item.timing}</td>
                    <td>{item.seatCapacity}</td>
                    <td className="icon-wrap">
                      <i className="fa fa-pencil pr-3" aria-hidden="true"></i>
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default Doctor;

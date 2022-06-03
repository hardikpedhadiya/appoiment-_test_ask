import React, { useState } from "react";
import { Tab, Tabs, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

interface IProps { }
const UserAppointment: React.FunctionComponent<IProps> = ({ }) => {
  const [capacity, setCapacity] = useState<number>(6);
  const diffrence = 15;
  const currentDate = new Date();
  const nextDay = new Date();
  nextDay.setDate(currentDate.getDate() + 1);
  const [startDate, setStartDate] = useState<Date>(nextDay);
  const [startDateHour, setStartDateHour] = useState<Date>(new Date());
  const [startDateMinute, setStartDateMinute] = useState<Date>(new Date());
  const [endDateHour, setEndDateHour] = useState<Date>(
    new Date(new Date().getTime() + 45 * 60000)
  );
  const [endDateMinute, setEndDateMinute] = useState<Date>(
    new Date(new Date().getTime() + 45 * 60000)
  );
  const [error, setError] = useState({
    isNotValidNumber: false,
    isValidEndTime: false,
  });
  const filterPassedTime = (time: any) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };
  const isFloat = (val: any) => {
    return Number(val) === val && val % 1 !== 0;
  }
  const submitSlot = () => {
    let isValidDate = true;

    let hourDiff = endDateHour?.getTime() - startDateHour.getTime();
    if (hourDiff < 0) {
      isValidDate = false;
    }

    let minuteDiff =
      (endDateMinute.getTime() - startDateMinute.getTime()) / 60000;

    minuteDiff += 15;

    if (minuteDiff < 0 || minuteDiff == 0) {
      isValidDate = false;
    }

    if (!isValidDate) {
      setError({ ...error, isValidEndTime: true });
    } else {

      let totalSlot = Math.floor(minuteDiff / diffrence);
      let seatCapacity = eval((capacity / totalSlot).toFixed(2));

      if (seatCapacity < 0.99) {
        seatCapacity = 1;
      }

      let slotList = [];
      let sloatDate = startDateMinute;
      let lastSeatCapacity = 0;

      for (let index = 1; index <= totalSlot; index++) {
        let startHours = sloatDate.getHours();
        let startMinits = sloatDate.getMinutes();

        sloatDate.setTime(sloatDate.getTime() + diffrence * 60 * 1000);

        let endHours = sloatDate.getHours();
        let endMinits = sloatDate.getMinutes();
        let currentValue;

        if (isFloat(seatCapacity)) {
          let getDecimalValue: string = seatCapacity;
          let indexId = getDecimalValue.toString().indexOf('.');
          let decimalValue = getDecimalValue.toString().substring(indexId + 1);
          decimalValue = "0." + decimalValue;
          lastSeatCapacity += parseFloat(decimalValue);
          let startValue = seatCapacity.toString();
          currentValue = startValue.substring(0, startValue.indexOf('.'));
        } else {
          currentValue = seatCapacity;
        }

        if (index == totalSlot) {
          let getValue: number = parseFloat(currentValue);
          lastSeatCapacity = Math.ceil(lastSeatCapacity + getValue);
        }

        let slotDetails = {
          timing: startHours + ":" + startMinits + " - " + endHours + ":" + endMinits,
          seatCapacity: index == totalSlot ? `${lastSeatCapacity}` : `${currentValue}`,
        };
        slotList.push(slotDetails);
      }
      localStorage.setItem("slots", JSON.stringify(slotList));
      if (slotList.length > 0) {
        alert("Sloat sucessfully created.")
      }
    }
  };

  return (
    <div>
      <div className="d-flex py-3 px-2 groups-title-wrap">
        <div className="pr-1"> <span className="bar-wrap">
          <i className="fa fa-bars"></i>
        </span></div>
        <h3 className="groups-title pt-1">Create Appointment Slots</h3>
      </div>
      <div>
        <Tabs defaultActiveKey="15_min_slot" className="mb-3">
          <Tab eventKey="15_min_slot" title="Create Bulk 15 Min. Slots">
            <div className="row py-4">
              <div className="col-3">
                <p className="m-0 date-piker-wrap">
                  1. select date of appointment *
                </p>
                <span className="date-piker-text mb-2">
                  Please select the dates that you'd like to open up slots.
                </span>
                <div className="mt-4 main-date-piker">
                  <DatePicker
                    excludeDates={[new Date()]}
                    selected={startDate}
                    minDate={new Date()}
                    onChange={(date: Date) => {
                      setStartDate(date);
                    }}
                    inline
                  />
                </div>
              </div>
              <div className="col-4 hour-select-wrap">
                <p className="m-0 date-piker-wrap">2. SELECT The Hours *</p>
                <span className="date-piker-text mb-2">
                  Please select the Start and End Time.
                </span>
                <div className="row">
                  <div className="mt-4 col-6 pr-0">
                    <div className="time-select d-flex">
                      <div>
                        <label className="hour-select">Start Hour</label>
                        <DatePicker
                          selected={startDateHour}
                          onChange={(date: Date) => {
                            setStartDateHour(date);
                            setStartDateMinute(date);
                            setEndDateHour(date);
                            setEndDateMinute(date);
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={60}
                          // filterTime={filterPassedTime}
                          timeCaption="Time"
                          timeFormat="HH:mm"
                          dateFormat="H"
                        />
                      </div>
                      <div>
                        <label className="hour-select">Minute</label>
                        <div className="time-select d-flex justify-content-center">
                          <div className="mr-2">
                            <DatePicker
                              selected={startDateMinute}
                              onChange={(date: Date) => {
                                setStartDateHour(date);
                                setStartDateMinute(date);
                                setEndDateHour(date);
                              }}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={15}
                              // filterTime={filterPassedTime}
                              timeCaption="Time"
                              timeFormat="HH:mm"
                              dateFormat="mm"
                            />
                          </div>
                          <div className="h3">:</div>
                        </div>
                      </div>
                    </div>
                    <p className="Start-Time">Please select the Start Time.</p>
                  </div>
                  <div className="mt-4 col-6">
                    <div className="time-select d-flex">
                      <div>
                        <label className="hour-select">End Hour</label>
                        <DatePicker
                          selected={endDateHour}
                          onChange={(date: Date) => {
                            setEndDateHour(date);
                            setEndDateMinute(date);
                            setStartDateHour(date);
                            setStartDateMinute(date);
                            setError({
                              ...error,
                              isValidEndTime: false,
                            });
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={60}
                          timeCaption="Time"
                          timeFormat="HH:mm"
                          // filterTime={filterPassedTime}
                          dateFormat="H"
                        />
                      </div>
                      <div>
                        <label className="hour-select">Minute</label>
                        <DatePicker
                          selected={endDateMinute}
                          onChange={(date: Date) => {
                            setEndDateHour(date);
                            setEndDateMinute(date);
                            setError({
                              ...error,
                              isValidEndTime: false,
                            });
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          // filterTime={filterPassedTime}
                          timeCaption="Time"
                          timeFormat="HH:mm"
                          dateFormat="mm"
                        />
                      </div>
                    </div>
                    <p className="Start-Time">
                      Please select the time your last 15 min Block Starts
                    </p>
                    {error.isValidEndTime && (
                      <span className="text-danger">
                        End time should be greater than the start time.
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-3">
                <p className="m-0 date-piker-wrap">
                  3. Choose Seating Capacity *
                </p>
                <span className="date-piker-text mb-2">
                  Please select the dates that you'd like to open up slots.
                </span>
                <div className="mt-4">
                  <Form.Control
                    type="number"
                    value={capacity}
                    onChange={(e: any) => {
                      if (e.target.value !== "" && e.target.value > 0) {
                        setCapacity(e.target.value);
                        if (e.target.value % 1 !== 0) {
                          setError({ ...error, isNotValidNumber: true });
                        } else {
                          if (e.target.value > 0) {
                            setError({
                              ...error,
                              isNotValidNumber: false,
                            });
                          }
                        }
                      }
                    }}
                  />
                  {error.isNotValidNumber && (
                    <span className="text-danger">Invalid input</span>
                  )}
                </div>
              </div>
              <div className="col-2"></div>
            </div>
            <div className="btn-wrap mt-4">
              <Button variant="btn btn-cancel">Cancel</Button>{" "}
              <Button variant="btn btn-create" onClick={() => submitSlot()}>
                Create Slots
              </Button>
            </div>
          </Tab>
          <Tab
            eventKey="one_slot"
            title="Create One Slots"
            className="table-search-wrap "
          ></Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default UserAppointment;

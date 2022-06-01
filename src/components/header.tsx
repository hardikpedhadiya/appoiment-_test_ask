import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

import { siteLogo } from "../Image/index";

interface IProps {}
const Header: React.FunctionComponent<IProps> = (props) => {
  return (
    <div className="header-wrap">
      <div className="row">
        <div className="col-2 bg-wrap">
          <div className="logo-wrap">
            <img src={siteLogo} />
          </div>
        </div>
        <div className="col-10">
          <div className="d-flex justify-content-between align-items-center p-2">
            <div>
              <div className="form-group has-search d-flex justify-content-between align-items-center">
                <span className="fa fa-search form-control-feedback"></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search anything"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="d-flex">
                <div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                    className="rounded-circle shadow-4"
                    style={{ width: "40px" }}
                    alt="Avatar"
                  />
                </div>
                <div className="user-group-wrap">
                  <p className="user-name">Mr Luis</p>
                  <span className="user-type">Patient</span>
                </div>
              </div>
              <div className="btn-group">
                <DropdownButton
                  id="dropdown-basic-button"
                  title=""
                >
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
            {/* <div>
              <div className="flex justify-between">
                  <div className="flex items-center">

                    <button data-dropdown className="flex items-center px-3 py-2 focus:outline-none hover:bg-gray-200 hover:rounded-md" type="button" x-data="{ open: false }">
                      <img src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" alt="Profle" className="h-8 w-8 rounded-full" />
                     
                      <span className="ml-4 text-sm hidden md:inline-block">Jessica Smith</span>
                      <svg className="fill-current w-3 ml-4" viewBox="0 0 407.437 407.437">
                        <path d="M386.258 91.567l-182.54 181.945L21.179 91.567 0 112.815 203.718 315.87l203.719-203.055z" /></svg>

                      <div data-dropdown-items className="text-sm text-left absolute top-0 right-0 mt-16 mr-4 bg-white rounded border border-gray-400 shadow" x-show="open">
                        <ul>
                          <li className="px-4 py-3 border-b hover:bg-gray-200"><a href="#">My Profile</a></li>
                          <li className="px-4 py-3 border-b hover:bg-gray-200"><a href="#">Settings</a></li>
                          <li className="px-4 py-3 hover:bg-gray-200"><a href="#">Log out</a></li>
                        </ul>
                      </div>
                    </button>
                  </div>
              </div>
            </div> */}
          </div>
            </div>
          </div>
    </div>
  );
};
export default Header;

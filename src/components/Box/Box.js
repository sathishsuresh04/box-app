import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import boxService from "../../services/boxService";
import SectionContent from "../Styled/SectionContent";
import Grid from "../Grid/Grid";
import Dropdown from "../Dropdown/Dropdown";
import "./Box.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allCountries } from "../../data";

const Box = () => {
  const [boxes, setBoxes] = useState([]);
  const defaultBoxInformation = {
    receiverName: "",
    weight: "",
    colour: "",
    rgbColorValue: "",
    country: 0,
  };
  const [defaultBoxInfo, setDefaultBoxInfo] = useState({});
  useEffect(() => {
    getBoxes();
  }, []);

  var result = {
    Caption: "Box Information",
    Columns: [
      {
        Name: "id",
        Caption: "Id",
        Visible: false,
        IsKey: true,
      },
      {
        Name: "receiverName",
        Caption: "ReceiverName",
        Visible: true,
      },
      {
        Name: "weight",
        Caption: "Weight",
        Visible: true,
      },
      {
        Name: "colour",
        Caption: "Colour",
        Visible: true,
        BackgroundColour: true,
      },
      {
        Name: "shippingCost",
        Caption: "ShippingCost",
        Visible: true,
      },
    ],
    RowCount: boxes.length,
    Rows: boxes,
    RowClick: null,
  };

  const handleOnChange = (obj) => {
    setDefaultBoxInfo((old) => ({ ...old, ...obj }));
  };
  const getBoxes = () => {
    // var data = boxService.getBoxes();
    // setBoxes(data);
    setDefaultBoxInfo(defaultBoxInformation);
    boxService.getBoxes().then((res) => {
      setBoxes(res);
    });
  };
  let getRgbValue = (colour) => {
    var value = colour.match(/[A-Za-z0-9]{2}/g);
    value = value.map(function (v) {
      return parseInt(v, 16);
    });
    return value.join(",");
  };
  const saveBox = () => {
    if (validate()) {
      boxService.saveBoxes(JSON.stringify(defaultBoxInfo)).then(() => {
        toast.success("Successfully saved");
      });
      getBoxes();
    }
    return false;
  };
  const validate = () => {
    //validate name
    if (
      !defaultBoxInfo.receiverName ||
      !defaultBoxInfo.weight ||
      !defaultBoxInfo.colour ||
      !defaultBoxInfo.country
    ) {
      toast.error("All fields must be filled in.");
      return false;
    } else if (defaultBoxInfo.weight < 0) {
      toast.error("Please enter valid weight in kg.");
      return false;
    }
    return true;
  };
  return (
    <React.Fragment>
      <SectionContent>
        <div className="panel-content" style={{ width: "50%" }}>
          <div className="section-title">Boxes Information</div>
          <div className="form-group">
            <label htmlFor="name" className="required">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={defaultBoxInfo.receiverName}
              onChange={(e) => {
                var data = {
                  ...defaultBoxInfo,
                  receiverName: e.target.value,
                };
                handleOnChange(data);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight" className="required">
              Weight (in Kg.)
            </label>
            <input
              id="weight"
              type="number"
              min="0"
              value={defaultBoxInfo.weight}
              onChange={(e) => {
                var data = {
                  ...defaultBoxInfo,
                  weight: e.target.value,
                };
                handleOnChange(data);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="colour" className="required">
              Box Colour
            </label>
            <input
              id="colour"
              type="color"
              value={defaultBoxInfo.colour}
              onChange={(e) => {
                e.stopPropagation();
                const color = e.target.value;
                var data = {
                  ...defaultBoxInfo,
                  colour: color,
                  rgbColorValue: getRgbValue(color),
                };
                handleOnChange(data);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="drpConuntries" className="required">
              Country
            </label>
            <Dropdown
              id="drpConuntries"
              data={allCountries}
              idField="id"
              textField="text"
              width="10px"
              selected={defaultBoxInfo.country}
              onChange={(obj) => {
                var data = { ...defaultBoxInfo, country: obj.value };
                handleOnChange(data);
              }}
            />
          </div>
          <button
            className="btn btn-success mr-3"
            onClick={saveBox}
            type="button"
          >
            Save
          </button>
        </div>
      </SectionContent>
      <SectionContent>
        <div className="section-title">Boxes Information</div>
        <div className="customization-table">
          <Grid result={result} />
        </div>
      </SectionContent>
      <ToastContainer />
    </React.Fragment>
  );
};
export default Box;

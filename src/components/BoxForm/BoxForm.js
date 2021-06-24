import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allCountries } from "../../data";
import SectionContent from "../Styled/SectionContent";
import Dropdown from "../Dropdown/Dropdown";
import boxService from "../../services/boxService";
const BoxForm = () => {
  const defaultBoxInformation = {
    receiverName: "",
    weight: "",
    colour: "",
    rgbColorValue: "",
    country: 0,
  };
  const [defaultBoxInfo, setDefaultBoxInfo] = useState({});
  useEffect(() => {
    setDefaultBoxInfo(defaultBoxInformation);
  }, []);
  const handleOnChange = (obj) => {
    setDefaultBoxInfo((old) => ({ ...old, ...obj }));
  };
  let getRgbValue = (colour) => {
    var value = colour.match(/[A-Za-z0-9]{2}/g);
    value = value.map(function (v) {
      return parseInt(v, 16);
    });
    return value.join(",");
  };
  const saveBox = () => {
    var countryVal = allCountries.find((x) => {
      if (x) {
        return x.id === defaultBoxInfo.country;
      }
    }).text;
    if (validate()) {
      var data = {
        receiverName: defaultBoxInfo.receiverName,
        weight: parseFloat(defaultBoxInfo.weight),
        colour: defaultBoxInfo.rgbColorValue,
        country: countryVal,
      };
      boxService.saveBoxes(JSON.stringify(data)).then(() => {
        toast.success("Successfully saved");
        setDefaultBoxInfo({});
      });
    }
    return false;
  };
  const validate = () => {
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
      <ToastContainer />
    </React.Fragment>
  );
};

export default BoxForm;

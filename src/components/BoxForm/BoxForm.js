import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uuidv4 } from "../../utils";
const ShippingForm = () => {
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const defaultShippingForm = {
    Id: uuidv4(),
    Name: "",
    Weight: "Field",
    Color: false,
    Country: "",
  };

  useEffect(() => {
    //get countries
  }, []);
};

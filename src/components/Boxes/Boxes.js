import React, { useEffect, useState } from "react";
import boxService from "../../services/boxService";
import SectionContent from "../Styled/SectionContent";
import Grid from "../Grid/Grid";

import "./Boxes.scss";

const Box = () => {
  const [boxes, setBoxes] = useState([]);

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

  const getBoxes = () => {
    // var data = boxService.getBoxes();
    // setBoxes(data);
    boxService.getBoxes().then((res) => {
      setBoxes(res);
    });
  };

  return (
    <React.Fragment>
      <SectionContent>
        <div className="section-title">Boxes Information</div>
        <div className="customization-table">
          <Grid result={result} />
        </div>
      </SectionContent>
    </React.Fragment>
  );
};
export default Box;

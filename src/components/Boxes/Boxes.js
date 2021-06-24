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
  function sumByProperty(items, prop) {
    return items
      .flat()
      .reduce(function (a, b) {
        return b[prop] == null ? a : a + b[prop];
      }, 0)
      .toFixed(2);
  }
  const getBoxes = () => {
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
      <div className="section-title">
        Total Weight :{sumByProperty(boxes, "weight")}
      </div>
      <div className="section-title">
        Total Shipping Cost :{`${sumByProperty(boxes, "shippingCost")} SEK`}
      </div>
    </React.Fragment>
  );
};
export default Box;

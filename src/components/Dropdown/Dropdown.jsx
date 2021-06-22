import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
const Dropdown = ({
  id,
  data,
  idField,
  textField,
  selected,
  onChange,
  placeholder,
  width,
  requiredActive,
  disabled,
  isMulti,
}) => {
  const [optionData, setOptionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const styles = {
    option: (provided, state) => {
      if (state.data.style) {
        return { ...provided, ...state.data.style };
      } else {
        return { ...provided };
      }
    },
  };
  useEffect(() => {
    let options =
      data.length > 0
        ? data.map((v, i) => {
            const itemId = idField ? v[idField] : v;
            const itemName = textField ? v[textField] : v;
            if (v.style) {
              return { label: itemName, value: itemId, style: v.style };
            } else {
              return { label: itemName, value: itemId };
            }
          })
        : [];
    setOptionData(options);
    let selectedOptions = [];
    if (selected) {
      if (typeof selected === "string") {
        let splitParameters = String(selected).split("|");
        splitParameters.map((v) => {
          options.map((f) => {
            if (f.value === v) selectedOptions.push(f);
          });
        });
      } else {
        selectedOptions = options.filter((v) => {
          return v.value === selected;
        });
      }
    }
    setSelectedOption(selectedOptions);
  }, [data, selected]);

  return (
    <React.Fragment>
      {optionData && (
        <Select
          name={id}
          options={optionData}
          onChange={onChange}
          value={selectedOption}
          isDisabled={disabled}
          className={requiredActive ? "required-active" : ""}
          placeholder={placeholder}
          isMulti={isMulti}
          styles={styles}
          style={{ width: width ? width : undefined }}
          noOptionsMessage={() => "no options available"}
        />
      )}
    </React.Fragment>
  );
};

Dropdown.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
  idField: PropTypes.any,
  textField: PropTypes.string,
  selected: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  requiredActive: PropTypes.bool,
  isMulti: PropTypes.bool,
  width: PropTypes.string,
};
Dropdown.defaultProps = {
  data: [],
  idField: null,
  textField: null,
  selected: "",
  placeholder: " ",
  requiredActive: false,
};

export default Dropdown;

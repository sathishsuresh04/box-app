import * as React from "react";
import { useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import TableContent from "../Styled/TableContent";
import "./Grid.scss";

const Grid = ({ result }) => {
  const [unModifiedResult, setUnModifiedResult] = useState(result);
  const [data, setdata] = useState([]);
  useEffect(() => {
    setUnModifiedResult(result);
    setdata(result.Rows);
  }, [result]);
  let mappedColumns = unModifiedResult.Columns.map((element) => ({
    Header: element.Caption,
    accessor: element.Name,
    disableSortBy: !element.Sortable,
    type: element.Type,
    cssClass: element.CssClass,
    conditionalStyling: element.conditionalStyling || null,
    isBackgroundColour: element.BackgroundColour,
  }));
  let hideColumns = unModifiedResult.Columns.map((item) => {
    if (!item.Visible) {
      return item.Name;
    }
  });
  let columns = React.useMemo(() => mappedColumns, []);
  let hiddenColumns = React.useMemo(() => hideColumns, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        disableSortRemove: true,
        initialState: {
          hiddenColumns: hiddenColumns,
        },
      },
      useSortBy
    );
  return (
    <React.Fragment>
      <TableContent>
        <table {...getTableProps()} className="table-container">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <React.Fragment>
                      {column.isSorted && (
                        <span>{column.isSortedDesc ? " 🔽" : " 🔼"}</span>
                      )}
                    </React.Fragment>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {(rows.length > 0 &&
              rows.map((row, i) => {
                prepareRow(row);
                return (
                  <React.Fragment key={i}>
                    <tr
                      {...row.getRowProps()}
                      key={`row_${i}`}
                      onClick={
                        row.original.CssClass &&
                        row.original.CssClass === "disabled"
                          ? () => {}
                          : () => {
                              unModifiedResult.RowClick &&
                                unModifiedResult.RowClick(row.original);
                            }
                      }
                      className={row.original.CssClass}
                    >
                      {row.cells.map((cell) => {
                        return cell.column.isBackgroundColour ? (
                          <td
                            style={
                              cell.column.isBackgroundColour
                                ? {
                                    backgroundColor: `rgb(${row.original.colour})`,
                                  }
                                : {}
                            }
                            className={
                              cell.column.cssClass +
                              `${
                                cell.column.conditionalStyling !== null
                                  ? " " +
                                    cell.column.conditionalStyling(row, cell)
                                  : ""
                              }`
                            }
                            {...cell.getCellProps()}
                          ></td>
                        ) : (
                          <td
                            style={
                              cell.column.isBackgroundColour
                                ? {
                                    backgroundColor: `rgb(${row.original.colour})`,
                                  }
                                : {}
                            }
                            className={
                              cell.column.cssClass +
                              `${
                                cell.column.conditionalStyling !== null
                                  ? " " +
                                    cell.column.conditionalStyling(row, cell)
                                  : ""
                              }`
                            }
                            {...cell.getCellProps()}
                          >
                            {cell.value ? cell.render("Cell") : null}
                          </td>
                        );
                      })}
                    </tr>
                  </React.Fragment>
                );
              })) || (
              <tr>
                <td className="text-center">No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </TableContent>
    </React.Fragment>
  );
};

export default Grid;

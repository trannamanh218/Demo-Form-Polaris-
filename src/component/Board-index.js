import { Page, LegacyCard, DataTable } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
const BoardIndex = ({ dataOption }) => {
  const [rowsOption, setRowsOption] = useState([]);

  useEffect(() => {
    const rows = dataOption.map((option) => {
      return [
        option.title ? option.title : "none",
        option.discount ? option.discount : "none",
        option.quantity ? option.quantity : "none",
        option.amuont ? option.amuont : "none",
      ];
    });
    setRowsOption(rows);
  }, [dataOption]);

  return (
    <DataTable
      columnContentTypes={["text", "numeric", "numeric", "numeric", "numeric"]}
      headings={["Title", "Discount Type", "Quantity", "Amount"]}
      rows={rowsOption}
    />
  );
};
export default BoardIndex;

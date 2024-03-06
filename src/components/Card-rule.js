import { Grid, Icon, Select, TextField } from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";
import { useState, useCallback, useEffect } from "react";
const CardRule = ({
  checkValidate,
  checkDelete,
  setCheckDelete,
  setIntOptionForm,
  indexItem,
  itemOption,
  setIdDelete,
  hanleChangeInputOption,
}) => {
  const [selected, setSelected] = useState("none");

  const handleSelectChange = (value, id) => {
    setSelected(value);
    setIntOptionForm((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, discount: value } : option
      )
    );
  };

  const options = [
    { label: "None", value: "none" },
    { label: "Each", value: "each" },
    { label: "% Discount", value: "discount" },
  ];

  useEffect(() => {
    setSelected(itemOption.discount);
  }, [itemOption]);

  return (
    <div className="container__card">
      <h1
        style={{
          background: "#ff4906",
          width: "fit-content",
          padding: "3px 15px 3px 5px",
          color: "white",
          borderRadius: "0px 0px 7px",
        }}
      >
        OPTION {indexItem}
      </h1>

      <div
        className="delete"
        style={{
          padding: "0px 50px",
          display: "flex",
          justifyContent: "",
        }}
        onClick={() => {
          setIdDelete(indexItem);
          setCheckDelete(!checkDelete);
        }}
      >
        <Icon className="icon-right" source={DeleteIcon} tone="base" />
      </div>
      <Grid padding="300">
        <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
          <TextField
           id="textField"
            value={itemOption.title}
            placeholder="Enter .... "
            label="Title"
            onChange={(e) => hanleChangeInputOption(indexItem, e, "title")}
            autoComplete="email"
            noValidate={false}
            error={!itemOption.title && checkValidate ? "Vui lòng nhập đủ" : ""}
          />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
          <TextField
           id="textField"
            value={itemOption.subtitle}
            placeholder="Enter .... "
            label="Subtitle"
            onChange={(e) => hanleChangeInputOption(indexItem, e, "subtitle")}
            autoComplete="off"
            error={
              !itemOption.subtitle && checkValidate ? "Vui lòng nhập đủ" : ""
            }
          />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
          <TextField
           id="textField"
            value={itemOption.label}
            placeholder="Enter .... "
            label="labe ( optinal)"
            onChange={(e) => hanleChangeInputOption(indexItem, e, "label")}
            autoComplete="email"
          />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
          <TextField
           id="textField"
            value={itemOption.quantity ? Number(itemOption.quantity) : ""}
            placeholder="Enter .... "
            type="number"
            label="Quantity"
            onChange={(e) => hanleChangeInputOption(indexItem, e, "quantity")}
            autoComplete="email"
            min={1}
            step={1}
            prefix={<span className="no-spinner" />}
            error={
              !itemOption.quantity && checkValidate ? "Vui lòng nhập đủ" : ""
            }
          />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
          <Select
           id="textField"
            label="Discount type"
            options={options}
            onChange={(e) => handleSelectChange(e, indexItem)}
            value={selected}
            requiredIndicator={true}
          />
        </Grid.Cell>
        {selected !== "none" && (
          <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
            <TextField
             id="textField"
              value={itemOption.amuont ? Number(itemOption.amuont) : ""}
              placeholder="Enter .... "
              type="number"
              label="Amuont"
              onChange={(e) => hanleChangeInputOption(indexItem, e, "amuont")}
              pattern="\d*"
              suffix={
                itemOption.discount == "each"
                  ? "$"
                  : itemOption.discount == "discount"
                  ? "%"
                  : ""
              }
              error={
                !itemOption.amuont && checkValidate ? "Vui lòng nhập đủ" : ""
              }
            />
          </Grid.Cell>
        )}
      </Grid>
    </div>
  );
};
export default CardRule;

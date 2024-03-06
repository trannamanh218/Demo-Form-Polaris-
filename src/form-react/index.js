import {
  BlockStack,
  Card,
  FormLayout,
  InlineGrid,
  Page,
  TextField,
  Text,
  Divider,
  Button,
  Form,
  Box,
  Toast,
  Frame,
} from "@shopify/polaris";
import "./style.scss";
import { PlusIcon } from "@shopify/polaris-icons";
import BoardIndex from "../component/Board-index";
import CardRule from "../component/Card-rule";
import { useCallback, useEffect, useState } from "react";

const FormReact = () => {
  const [idDelete, setIdDelete] = useState();
  const [checkDelete, setCheckDelete] = useState(false);

  const [intCamPaign, setIntCamPaign] = useState({
    camPaign: "",
    titleCamPaign: "",
    descriptionCamPaign: "",
  });

  const [intOptionForm, setIntOptionForm] = useState([
    {
      id: 1,
      title: "Single",
      subtitle: "Standavd price",
      label: "",
      quantity: 1,
      discount: "none",
      amuont: '',
    },
    {
      id: 2,
      title: "Duo",
      subtitle: "save 10%",
      label: "Popular",
      quantity: 2,
      discount: "discount",
      amuont: 10,
    },
  ]);

  const onchangeInput = (text, checkText) => {
    switch (checkText) {
      case "CamPaign":
        setIntCamPaign({ ...intCamPaign, camPaign: text });
        break;
      case "Title":
        setIntCamPaign({ ...intCamPaign, titleCamPaign: text });
        break;
      case "Description":
        setIntCamPaign({ ...intCamPaign, descriptionCamPaign: text });
        break;
      default:
        console.log("err");
    }
  };

  const hanleChangeInputOption = useCallback((id, value, title) => {
   
    if (title === "quantity" || title === "amuont") {
      setIntOptionForm((prevOptions) =>
        prevOptions.map((option) =>
          option.id === id ? { ...option, [title]: Number(value) } : option
        )
      );
    } else {
      setIntOptionForm((prevOptions) =>
        prevOptions.map((option) =>
          option.id === id ? { ...option, [title]: value } : option
        )
      );
    }
  }, []);

  const handleClickAddOption = () => {
    setIntOptionForm((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        title: "",
        label: "",
        description: "",
        quantity: 0, // Sử dụng giá trị mặc định hoặc giá trị mong muốn
        discount: "none",
        Amuont: '',
      },
    ]);
  };

  useEffect(() => {
    if (idDelete) {
      setIntOptionForm((prevOptions) =>
        prevOptions.filter((option) => option.id !== idDelete)
      );
    }
  }, [checkDelete]);

  const handleSubmit = () => {
    const data = { ...intCamPaign, option: intOptionForm };
    console.log("Data post", data);
    toggleActive();
  };

  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Success" onDismiss={toggleActive} />
  ) : null;

  console.log("intOptionForm", intOptionForm);

  return (
    <div className="container__form">
      <Frame>
        {toastMarkup}
        <Page
          backAction={{ content: "Products", url: "/products" }}
          title="Create volume discount"
        >
          {" "}
          <InlineGrid columns={{ xs: 1, md: "2fr 1fr" }} gap="400">
            <Form onSubmit={handleSubmit}>
              <BlockStack gap="100">
                <Card roundedAbove="sm">
                  <Text variant="headingLg" as="h6">
                    General
                  </Text>
                  <FormLayout>
                    <TextField
                      value={intCamPaign.camPaign}
                      title="CamPaign"
                      placeholder="Enter .... "
                      type="CamPaign"
                      label="CamPaign"
                      onChange={(e) => onchangeInput(e, "CamPaign")}
                      autoComplete="off"
                    />
                    <TextField
                      value={intCamPaign.titleCamPaign}
                      placeholder="Enter .... "
                      type="Title"
                      label="Title"
                      onChange={(e) => onchangeInput(e, "Title")}
                      autoComplete="email"
                    />
                    <TextField
                      value={intCamPaign.descriptionCamPaign}
                      placeholder="Enter .... "
                      type="Description"
                      label="Description"
                      onChange={(e) => onchangeInput(e, "Description")}
                      autoComplete="email"
                    />
                  </FormLayout>
                </Card>

                <Card roundedAbove="sm" padding={0}>
                  <Box padding="400">
                    <Text variant="headingLg" as="h5" marginInlineEnd={200}>
                      Volume discount rule
                    </Text>
                  </Box>

                  {intOptionForm.map((item) => (
                    <CardRule
                      setIntOptionForm={setIntOptionForm}
                      indexItem={item.id}
                      itemOption={item}
                      checkDelete={checkDelete}
                      setCheckDelete={setCheckDelete}
                      setIdDelete={setIdDelete}
                      hanleChangeInputOption={hanleChangeInputOption}
                    />
                  ))}
                  <Box padding={300}>
                    <Button
                      width="100%"
                      onClick={handleClickAddOption}
                      icon={PlusIcon}
                      size="large"
                      fullWidth={true}
                    >
                      Add option
                    </Button>
                  </Box>
                </Card>
                {intOptionForm.length > 0 && <Button submit>Submit</Button>}
              </BlockStack>
            </Form>
            <Box width="380px">
              <Card roundedAbove="sm">
                <Text variant="headingMd" as="h6">
                  Preview
                </Text>

                <Text id="title__card" variant="headingLg" as="h6">
                  Buy more and save
                </Text>

                <Text id="title__sub__card" variant="headingMd" as="h6">
                  Apply for all products in store
                </Text>
                <BoardIndex dataOption={intOptionForm} />
              </Card>
            </Box>
          </InlineGrid>
        </Page>
      </Frame>
    </div>
  );
};
export default FormReact;

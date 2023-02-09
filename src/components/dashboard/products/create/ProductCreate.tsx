import { yupResolver } from "@hookform/resolvers/yup";
import React, { SyntheticEvent, useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Badge,
  Container,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../../api/model/category";
import { Image } from "../../../../api/model/image";
import { Size } from "../../../../api/model/size";
import { getCategory } from "../../../../api/services/category";
import { uploadImage } from "../../../../api/services/image-file";
import { getProductSize } from "../../../../api/services/size";
import AdminLayout from "../../../layouts/AdminLayout";
import { getErrorMessage } from "../../../utils/auth-lib";
import {
  productCreateSchema,
  ProductFormFields,
  ProductVariant,
} from "./product.helpers";

import _ from "lodash";
import { MdClose } from "react-icons/md";
import { createProduct } from "../../../../api/services/products";

const ProductCreate = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [imageFile, setImageFile] = useState<Image>({} as Image);
  const [variant, setVariant] = useState({
    name: "",
    size: [] as number[],
  });

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    getCategory()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => console.log(error));

    getProductSize()
      .then((res) => {
        setSizes(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductFormFields>({
    resolver: yupResolver(productCreateSchema),
    mode: "onTouched",
  });

  const errorMessage = getErrorMessage(errors);

  const onSubmit = async (data: ProductFormFields) => {
    try {
      const formFiled = {
        ...data,
        price: +Number(data.price).toFixed(2),
        variant: selectedVariant,
      };
      console.log("submitted data ", formFiled);
      await createProduct(formFiled);
      navigate(`/dashboard`);
    } catch (error) {
      console.log("login error", error);
    }
  };

  const handleFileUpload = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files instanceof FileList ? target.files : null;
    if (!files) {
      return;
    }
    let formData = new FormData();
    formData.append("fileName", files[0]);

    setLoading(true);
    uploadImage(formData)
      .then((res) => {
        setLoading(false);
        setImageFile(res.data);
        setValue("storageFileId", res?.data?.id);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getSelectedSize = (size: number[]) => {
    if (!size.length) {
      return [];
    }
    return _.intersectionWith(sizes, size, (o, id) => o.id === id);
  };

  const clearVariantInput = () => {
    setVariant((prev) => {
      return {
        name: "",
        size: [],
      };
    });
  };

  const addNewVariant = () => {
    if (variant.name.length > 0 && variant.size.length > 0) {
      const newVariant: ProductVariant = {
        name: variant.name,
        size: variant.size,
      };
      setSelectedVariant((prev) => [...prev, newVariant]);
      clearVariantInput();
    }
  };

  const deleteSelectedVariant = (e: SyntheticEvent, id: number) => {
    e.preventDefault();
    const findIndex = selectedVariant.findIndex((sV, i) => i === id);
    if (findIndex !== -1) {
      selectedVariant.splice(findIndex, 1);
      setSelectedVariant((prev) => [...prev]);
    }
  };

  return (
    <AdminLayout>
      <Container fluid>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md="8">
              <Row className="py-3">
                <Col>
                  <h3>Add New Product</h3>
                </Col>
              </Row>
            </Col>
            <Col md="4">
              <Row className="py-3">
                <Col md="6" className="px-2">
                  <Button
                    variant="outline-light w-100 bg-login mt-2 mb-2"
                    onClick={() => reset()}
                  >
                    <span className="text-center text-white">Discard</span>
                  </Button>
                </Col>
                <Col md="6" className="px-2">
                  <Button
                    variant="outline-light w-100 bg-login mt-2 mb-2"
                    type="submit"
                  >
                    <span className="text-center text-white">Save</span>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <Card.Body>
                  <Container fluid>
                    <Row>
                      <Col md="6">
                        <h4 className="mb-3 mt-3">Product Information </h4>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="name">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                              type="text"
                              {...register("name")}
                              placeholder=""
                            />
                            {errorMessage("name") && (
                              <Form.Text className="text-danger">
                                {errorMessage("name")}
                              </Form.Text>
                            )}
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group controlId={"categoryId"}>
                            <Form.Label>{`Product Category`}</Form.Label>
                            <Form.Select
                              {...register("categoryId")}
                              className={`rounded-0`}
                            >
                              <option>Select Category</option>
                              {categories.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </Form.Select>
                            {errorMessage("categoryId") && (
                              <Form.Text className="text-danger">
                                {errorMessage("categoryId")}
                              </Form.Text>
                            )}
                          </Form.Group>
                        </Row>

                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                              type="text"
                              {...register("price")}
                              placeholder=""
                            />
                            {errorMessage("price") && (
                              <Form.Text className="text-danger">
                                {errorMessage("price")}
                              </Form.Text>
                            )}
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                              type="text"
                              {...register("quantity")}
                              placeholder=""
                            />
                            {errorMessage("quantity") && (
                              <Form.Text className="text-danger">
                                {errorMessage("quantity")}
                              </Form.Text>
                            )}
                          </Form.Group>
                        </Row>
                        <Row className="mb-3 mt-2">
                          <Form.Group as={Col} controlId="collection">
                            <Form.Label>Collection</Form.Label>
                            <Form.Control
                              type="text"
                              {...register("collection")}
                              placeholder=""
                            />
                            {errorMessage("collection") && (
                              <Form.Text className="text-danger">
                                {errorMessage("collection")}
                              </Form.Text>
                            )}
                          </Form.Group>
                        </Row>
                      </Col>
                      <Col md="6">
                        <h4 className="mb-3 mt-3">Product Image</h4>
                        <p className="mt-2 mb-3">
                          Select a product photo. Include a attractive photo to
                          make the product more attractive to buyers.
                        </p>
                        <Card>
                          <Card.Body>
                            <Row>
                              <Col md="6">
                                <Card>
                                  <Card.Body>
                                    {Object.keys(imageFile).length > 0 ? (
                                      <img
                                        src={imageFile.image_url}
                                        alt={imageFile.fileName}
                                        className="img-fluid"
                                      />
                                    ) : (
                                      <img
                                        src="https://via.placeholder.com/150"
                                        alt="upload img"
                                        width={224}
                                        height={204}
                                      />
                                    )}
                                  </Card.Body>
                                </Card>
                              </Col>
                              <Col md="6">
                                <Row>
                                  <Col md="12" className="py-5">
                                    <Form.Group
                                      as={Col}
                                      controlId="formFileSm"
                                      className="mb-3"
                                    >
                                      <Form.Label>
                                        Upload Product Image
                                      </Form.Label>
                                      <Form.Control
                                        type="file"
                                        size="sm"
                                        name="propertyImage"
                                        onChange={handleFileUpload}
                                      />
                                    </Form.Group>
                                    {loading && (
                                      <Button
                                        variant="outline-dark"
                                        className="mt-3 ml-3 mb-3"
                                      >
                                        <Spinner
                                          as="span"
                                          animation="grow"
                                          size="sm"
                                          role="status"
                                          aria-hidden="true"
                                        />
                                        <span style={{ marginLeft: "5px" }}>
                                          Loading...
                                        </span>
                                      </Button>
                                    )}
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <h4 className="mb-3 mt-3">Product Details </h4>
                        <Row className="mb-3">
                          <Form.Group controlId={`description`}>
                            <Form.Label>{`description`}</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              {...register("description")}
                              placeholder={
                                "The Green to Wear 2.0 standard aims to reduce the environmental"
                              }
                              className={`rounded-0`}
                            />
                            {errorMessage("description") && (
                              <Form.Text className="text-danger">
                                {errorMessage("description")}
                              </Form.Text>
                            )}
                          </Form.Group>
                        </Row>

                        <Row className="mb-3 mt-2">
                          <Form.Group as={Col} controlId="videoUrlLink">
                            <Form.Label>Video Url(Optional)</Form.Label>
                            <Form.Control
                              type="text"
                              {...register("videoUrlLink")}
                              placeholder=""
                            />
                            {errorMessage("videoUrlLink") && (
                              <Form.Text className="text-danger">
                                {errorMessage("videoUrlLink")}
                              </Form.Text>
                            )}
                          </Form.Group>
                        </Row>
                      </Col>
                      <Col md="6">
                        <h4 className="mb-3 mt-3">Variants</h4>
                        {selectedVariant.length > 0 && (
                          <Card className="py-1 mb-3">
                            <Card.Body>
                              <Container>
                                <Row className="py-1">
                                  {selectedVariant.length > 0 &&
                                    selectedVariant.map((variant, i) => {
                                      const productSize = getSelectedSize(
                                        variant.size
                                      );
                                      return (
                                        <Col
                                          md="12"
                                          key={i}
                                          className="border py-1 mt-2 mb-2"
                                        >
                                          <Row>
                                            <Col md="10">
                                              <h6 className="mt-2">
                                                {variant.name}
                                              </h6>
                                              {productSize.length > 0 &&
                                                productSize.map((size) => (
                                                  <span
                                                    key={size.id}
                                                    className="px-1 py-1"
                                                  >
                                                    <Badge
                                                      bg="success"
                                                      className=""
                                                    >
                                                      {size.name}
                                                    </Badge>
                                                  </span>
                                                ))}
                                            </Col>
                                            <Col md="2" className="">
                                              <span className="px-2">
                                                <MdClose
                                                  size={18}
                                                  className="mx-auto d-block border border-danger cursor-pointer"
                                                  onClick={(e) =>
                                                    deleteSelectedVariant(e, i)
                                                  }
                                                />
                                              </span>
                                            </Col>
                                          </Row>
                                        </Col>
                                      );
                                    })}
                                </Row>
                              </Container>
                            </Card.Body>
                          </Card>
                        )}

                        <Card>
                          <Card.Body>
                            <Row className="mb-3">
                              <Form.Group as={Col} controlId="name">
                                <Form.Label>Variant</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="name"
                                  value={variant.name}
                                  onChange={({ target }) =>
                                    setVariant((prev) => {
                                      return {
                                        ...prev,
                                        name: target.value,
                                      };
                                    })
                                  }
                                  placeholder=""
                                />
                              </Form.Group>
                            </Row>
                            <Row>
                              <Form.Group controlId={"size"}>
                                <Form.Label>{`Size`}</Form.Label>
                                <Form.Select
                                  name="size"
                                  onChange={(e) => {
                                    setVariant((prev) => {
                                      return {
                                        ...prev,
                                        size: !prev.size.includes(
                                          +e.target.value
                                        )
                                          ? [
                                              ...new Set(prev.size),
                                              Number(e.target.value),
                                            ]
                                          : [...new Set(prev.size)],
                                      };
                                    });
                                  }}
                                  className={`rounded-0`}
                                >
                                  <option>Size</option>
                                  {sizes.map((item, index) => {
                                    return (
                                      <option key={index} value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                </Form.Select>
                              </Form.Group>
                            </Row>
                            <Row className="mt-2">
                              <Col>
                                <Card>
                                  <Card.Body>
                                    {getSelectedSize(variant.size).length > 0 &&
                                      getSelectedSize(variant.size).map(
                                        (size) => (
                                          <span
                                            key={size.id}
                                            className="px-1 py-1"
                                          >
                                            <Badge bg="success" className="">
                                              {size.name}
                                            </Badge>
                                          </span>
                                        )
                                      )}
                                  </Card.Body>
                                </Card>
                              </Col>
                            </Row>
                            <Button
                              variant="outline-light w-100 bg-login mt-2 mb-2"
                              onClick={addNewVariant}
                            >
                              <span className="text-center text-white">
                                + Add New Variant
                              </span>
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </AdminLayout>
  );
};

export default ProductCreate;

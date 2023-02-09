import React from "react";
import { Row, Col, Button, Table, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../api/model/product";
import { deleteProduct } from "../../../api/services/products";

import ProductNav from "./ProductNav";

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  let navigate = useNavigate();

  const handleProductDelete = (productId: number) => {
    deleteProduct(productId)
      .then((result) => {
        alert("Product deleted successfully");
        navigate(0)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container fluid>
      <ProductNav />
      <Container>
        <Row className="py-4 px-2">
          <Col className="">
            <Row>
              <Col className="mb-3 mt-2">
                <Button
                  className="btn-md btn-primary bg-login border-0"
                  onClick={() => navigate(`/dashboard/products/create`)}
                >
                  + Add Product
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Table className="border" responsive>
                  <thead>
                    <tr>
                      <th>productImage</th>
                      <th>Product Info</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Stock</th>
                      <th className="text-center">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 &&
                      products.map((product) => {
                        return (
                          <tr key={product.id}>
                            <td>
                              <img
                                src={product?.productImage?.image_url}
                                alt={product.name}
                                width={70}
                                height={100}
                              />
                            </td>
                            <td>
                              <div className="mt-4">{product.name}</div>
                            </td>
                            <td>
                              <div className="mt-4">{product.price}</div>
                            </td>
                            <td>
                              <div className="mt-4">{product.status}</div>
                            </td>
                            <td>
                              <div className="mt-4">{product.quantity}</div>
                            </td>
                            <td>
                              <div className="mt-4">
                                <Row>
                                  <Col className="px-2">
                                    <Button
                                      variant="info"
                                      className="btn btn-sm bg-login rounded-0 text-white w-100"
                                      onClick={() =>
                                        navigate(
                                          `/dashboard/products/edit/${product.id}`
                                        )
                                      }
                                    >
                                      Edit
                                    </Button>
                                  </Col>
                                  <Col className="px-2">
                                    <Button
                                      variant="danger"
                                      className="btn btn-sm rounded-0 text-white w-100"
                                      onClick={() =>
                                        handleProductDelete(product.id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </Col>
                                </Row>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ProductList;

import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { getProducts } from "../../../api/services/products";
import BasicPagination from "../../common/pagination/BasicPagination";
import { HandlePaginationProps } from "../../common/pagination/pagination-types";
import AdminLayout from "../../layouts/AdminLayout";
import {
  BasicType,
  DefaultProductMeta,
  getPropertiesByFilter,
  ProductsFilter,
} from "./product-list.helpers";
import ProductList from "./ProductsList";
type ProductMeta = {
  all_total: number;
  total: number;
  per_page: number;
  page: number;
};

const ProductIndex = () => {
  const [productList, setProductList] = useState([]);
  const [productMeta, setProductMeta] = useState<ProductMeta>({
    all_total: DefaultProductMeta.Length,
    total: DefaultProductMeta.Length,
    per_page: DefaultProductMeta.Length,
    page: DefaultProductMeta.Page,
  } as ProductMeta);

  const [active, setActive] = useState(1);
  const [filterClient, setFilterClient] = useState(false);
  const [customFilter, setCustomFilter] = useState<ProductsFilter>({
    basic: {
      page: DefaultProductMeta.Page,
      perPage: DefaultProductMeta.Length,
    },
    filters: {},
  });

  useEffect(() => {
    getProducts().then((result) => {
      setProductList(result?.data?.data);
      setProductMeta(result.data.meta);
    });
  }, []);

  useEffect(() => {
    filterClient &&
      getPropertiesByFilter({
        basic: customFilter.basic,
        order: customFilter.order,
        filters: customFilter.filters,
      }).then((result) => {
        setProductList(result?.data?.data);
        setProductMeta(result.data.meta);
      });
  }, [
    filterClient,
    customFilter.basic,
    customFilter.order,
    customFilter.filters,
  ]);

  const handlePageChange = useCallback(
    (pageFilter: HandlePaginationProps) => {
      filterClient === false && setFilterClient(true);
      pageFilter.page && setActive(pageFilter.page);
      for (const [key, value] of Object.entries(pageFilter)) {
        setCustomFilter((prevState) => {
          return {
            ...prevState,
            basic: {
              ...prevState.basic,
              [key as keyof BasicType]: Number(value),
            },
          };
        });
      }
    },
    [filterClient]
  );

  return (
    <AdminLayout>
      <ProductList products={productList} />
      {productList.length > 0 && (
        <Container fluid>
          <Container>
            <Row>
              <Col md="8">
                <Row>
                  <Col md="5">
                    <Row>
                      <Col>
                        <h4>Show result:</h4>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Select
                          defaultValue={active}
                            onChange={({ target }) =>
                              handlePageChange({ perPage: +target.value })
                            }
                            className={`rounded-0`}
                          >
                            <option>Per Page</option>
                            {[5, 10, 15, 20, 25].map((item, index) => {
                              return (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="7"></Col>
                </Row>
              </Col>
              <Col md="4">
                <BasicPagination
                  total={Number(
                    Math.ceil(productMeta.all_total / productMeta.per_page)
                  )}
                  active={active}
                  onChange={handlePageChange}
                />
              </Col>
            </Row>
          </Container>
        </Container>
      )}
    </AdminLayout>
  );
};

export default ProductIndex;

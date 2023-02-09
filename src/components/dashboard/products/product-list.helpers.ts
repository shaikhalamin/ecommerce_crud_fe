import _ from "lodash";
import qs from "qs";
import { Product } from "../../../api/model/product";
import { getFilterProducts } from "../../../api/services/products";

export enum DefaultProductMeta {
  Length = 10,
  Page = 1,
}

export type ProductData = {
  success: boolean;
  data: Product[];
  meta: {
    all_total: number;
    total: number;
    per_page: number;
    page: number;
  };
};

export type BasicType = {
  page: number;
  perPage: number;
};

export type KeyValueObject = {
  [key: string]: string | number | boolean;
};

export type ProductQueryFilters = {
  name?: string;
  variant?: string;
  status?: string;
  userId?: number | string;
  price?: number;
};

export type ProductsFilter = {
  basic: BasicType;
  order?: KeyValueObject;
  filters?: ProductQueryFilters;
};

export const removeFalsy = (malformedObject: KeyValueObject) => {
  return _.omitBy(malformedObject, _.isEmpty);
};

const createFilterUrl = (filterObject: ProductsFilter) => {
  const query = qs.stringify(
    {
      ...filterObject.basic,
      order: {
        ...filterObject.order,
      },
      filters: {
        ...removeFalsy(filterObject.filters as KeyValueObject),
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  return query;
};

export const getPropertiesByFilter = async (filterObject: ProductsFilter) => {
  const query = createFilterUrl(filterObject);
  return getFilterProducts(query);
};

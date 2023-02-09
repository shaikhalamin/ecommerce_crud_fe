import * as yup from "yup";

export type ProductVariant = {
  name: string;
  size: number[];
};

export type ProductFormFields = {
  name: string;
  price: number;
  quantity: number;
  description: string;
  collection: string;
  videoUrlLink: string;
  categoryId: number;
  storageFileId: number;
  variants: ProductVariant[];
};

export const productCreateSchema = yup
  .object({
    name: yup.string().required("Product name is required"),
    price: yup
      .number()
      .required("Price is required")
      .typeError("Price must be valid decimal value"),
    quantity: yup
      .number()
      .required("Quantity is required")
      .typeError("Quantity must be valid number"),
    description: yup.string().required("Description is required"),
    collection: yup.string().required("Please add product collection"),
    videoUrlLink: yup.string().optional().nullable(),
    categoryId: yup
      .number()
      .required("Category is required")
      .typeError("Category must be selected"),
    storageFileId: yup
      .number()
      .required("Product image is required")
      .typeError("Product image must be selected"),
    variants: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string(),
          size: yup.array(),
        })
      )
      .nullable(),
  })
  .required();

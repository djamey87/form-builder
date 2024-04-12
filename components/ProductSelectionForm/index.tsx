"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Product } from "@/app/api/products";

interface Props {
  products: Product[];
  onChange: (selected: []) => void;
}

export type SelectedProduct = {
  id: string;
  label: string;
};

export function ProductSelectionForm({ products, onChange }: Props) {
  const productFormMethods = useForm();
  const {
    register: productFormRegister,
    handleSubmit: handleProductSelection,
  } = productFormMethods;

  const onSelectProducts = handleProductSelection(async (data) => {
    const { products } = data;
    console.log("data", products);

    onChange(products);
  });

  return (
    <FormProvider {...productFormMethods}>
      <form onSubmit={onSelectProducts}>
        <label htmlFor="products">
          <h3>Select Products</h3>
        </label>
        <select
          defaultValue={["none"]}
          multiple
          {...productFormRegister("products")}
        >
          <option value="none" label="please select" disabled />
          {products.map(({ item_id, name, saleItems }) => (
            <optgroup key={item_id} label={name}>
              {saleItems?.length > 0 ? (
                <>
                  {saleItems.map(({ id, size }) => (
                    <option
                      key={`product-${item_id}-${id}`}
                      label={size}
                      value={JSON.stringify({ id, label: size })}
                    />
                  ))}
                </>
              ) : (
                <option value="none" label="please select" disabled />
              )}
            </optgroup>
          ))}
        </select>

        <div>
          <button type="submit">Select</button>
        </div>
      </form>
    </FormProvider>
  );
}

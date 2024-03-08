const URL_APP = process.env.URL_APP;
const URL_PRODUCTS = `${URL_APP}/products`;

export type Product = {
  item_id: string;
  name: string;
  saleItems: [{ size: string; item_id: string; id: string }];
};

export type ProductsResponse = {
  products: Product[];
};

export async function getProductsByCategory(
  categoryId: string
): Promise<ProductsResponse> {
  const res = (await fetch(`${URL_PRODUCTS}/?categoryId=${categoryId}`)).json();

  return res;
}

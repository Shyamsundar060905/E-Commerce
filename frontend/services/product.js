import URL from "../helper";

export async function getProduct() {
  const res = await fetch(`${URL}/products`);
  const data = await res.json();
  return data;
}

export async function getIndividualProduct(id) {
  const res = await fetch(`${URL}/products/${id}`);
  const data = await res.json();
  return data;
}

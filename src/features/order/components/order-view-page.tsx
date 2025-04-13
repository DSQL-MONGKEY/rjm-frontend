import { fakeProducts, Product } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import OrderForm from './order-form';

type TProductViewPageProps = {
  productId: string;
};

export default async function ProductViewPage({
  productId
}: TProductViewPageProps) {
  let product = null;
  let pageTitle = 'Create New Order';

  if (productId !== 'new') {
    const data = await fakeProducts.getProductById(Number(productId));
    product = data.product as Product;
    if (!product) {
      notFound();
    }
    pageTitle = `Edit Product`;
  }

  return <OrderForm initialData={product} pageTitle={pageTitle} />;
}

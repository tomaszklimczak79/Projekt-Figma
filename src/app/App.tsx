import '../styles/fonts.css';
import { AppRouter } from './router';
import { Layout } from './Layout';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ComparePage } from './pages/ComparePage';

const routes = [
  { path: '/', index: true, Component: HomePage },
  { path: '/category/:slug', Component: CategoryPage },
  { path: '/shop', Component: ProductListingPage },
  { path: '/shop/:category', Component: ProductListingPage },
  { path: '/product/:id', Component: ProductDetailPage },
  { path: '/cart', Component: CartPage },
  { path: '/checkout', Component: CheckoutPage },
  { path: '/account', Component: AccountPage },
  { path: '/account/:tab', Component: AccountPage },
  { path: '/contact', Component: ContactPage },
  { path: '/faq', Component: FAQPage },
  { path: '/compare', Component: ComparePage },
  { path: '*', Component: NotFoundPage },
];

export default function App() {
  return <AppRouter routes={routes} Layout={Layout} />;
}

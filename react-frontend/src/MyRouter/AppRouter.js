import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleProductsPage from "../components/app_components/ProductsPage/SingleProductsPage";
import ProductProjectLayoutPage from "../components/app_components/ProductsPage/ProductProjectLayoutPage";
import SingleCategoriesPage from "../components/app_components/CategoriesPage/SingleCategoriesPage";
import CategoryProjectLayoutPage from "../components/app_components/CategoriesPage/CategoryProjectLayoutPage";
import SingleCartsPage from "../components/app_components/CartsPage/SingleCartsPage";
import CartProjectLayoutPage from "../components/app_components/CartsPage/CartProjectLayoutPage";
import SingleOrdersPage from "../components/app_components/OrdersPage/SingleOrdersPage";
import OrderProjectLayoutPage from "../components/app_components/OrdersPage/OrderProjectLayoutPage";
import SinglePaymentsPage from "../components/app_components/PaymentsPage/SinglePaymentsPage";
import PaymentProjectLayoutPage from "../components/app_components/PaymentsPage/PaymentProjectLayoutPage";
import SingleInventoryPage from "../components/app_components/InventoryPage/SingleInventoryPage";
import InventoryProjectLayoutPage from "../components/app_components/InventoryPage/InventoryProjectLayoutPage";
import SingleCouponsPage from "../components/app_components/CouponsPage/SingleCouponsPage";
import CouponProjectLayoutPage from "../components/app_components/CouponsPage/CouponProjectLayoutPage";
import SingleReviewsPage from "../components/app_components/ReviewsPage/SingleReviewsPage";
import ReviewProjectLayoutPage from "../components/app_components/ReviewsPage/ReviewProjectLayoutPage";
import SingleWishlistsPage from "../components/app_components/WishlistsPage/SingleWishlistsPage";
import WishlistProjectLayoutPage from "../components/app_components/WishlistsPage/WishlistProjectLayoutPage";
import SingleShippingMethodsPage from "../components/app_components/ShippingMethodsPage/SingleShippingMethodsPage";
import ShippingMethodProjectLayoutPage from "../components/app_components/ShippingMethodsPage/ShippingMethodProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/products/:singleProductsId" exact element={<SingleProductsPage />} />
<Route path="/products" exact element={<ProductProjectLayoutPage />} />
<Route path="/categories/:singleCategoriesId" exact element={<SingleCategoriesPage />} />
<Route path="/categories" exact element={<CategoryProjectLayoutPage />} />
<Route path="/carts/:singleCartsId" exact element={<SingleCartsPage />} />
<Route path="/carts" exact element={<CartProjectLayoutPage />} />
<Route path="/orders/:singleOrdersId" exact element={<SingleOrdersPage />} />
<Route path="/orders" exact element={<OrderProjectLayoutPage />} />
<Route path="/payments/:singlePaymentsId" exact element={<SinglePaymentsPage />} />
<Route path="/payments" exact element={<PaymentProjectLayoutPage />} />
<Route path="/inventory/:singleInventoryId" exact element={<SingleInventoryPage />} />
<Route path="/inventory" exact element={<InventoryProjectLayoutPage />} />
<Route path="/coupons/:singleCouponsId" exact element={<SingleCouponsPage />} />
<Route path="/coupons" exact element={<CouponProjectLayoutPage />} />
<Route path="/reviews/:singleReviewsId" exact element={<SingleReviewsPage />} />
<Route path="/reviews" exact element={<ReviewProjectLayoutPage />} />
<Route path="/wishlists/:singleWishlistsId" exact element={<SingleWishlistsPage />} />
<Route path="/wishlists" exact element={<WishlistProjectLayoutPage />} />
<Route path="/shippingMethods/:singleShippingMethodsId" exact element={<SingleShippingMethodsPage />} />
<Route path="/shippingMethods" exact element={<ShippingMethodProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);

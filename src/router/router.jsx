import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authantication/Login";
import Register from "../pages/Authantication/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import RequestCharity from "../pages/Dashboard/User/RequestCharity";
import PrivateRoute from "./PrivateRoute";
import Favorites from "../pages/Dashboard/User/Favorites";
import MyReview from "../pages/Dashboard/User/MyReview";
import Forbidden from "../Components/Forbidden";
import CharityRoute from "../router/CharityRoute";
import CharityProfile from "../pages/Dashboard/Charity/CharityProfile";
import MyRequest from "../pages/Dashboard/Charity/MyRequest";
import MyPickup from "../pages/Dashboard/Charity/MyPickup";
import ReceivedDonation from "../pages/Dashboard/Charity/ReceivedDonation";
import RestaurantRoute from "../router/RestaurantRoute";
import RestaurantProfile from "../pages/Dashboard/Restaurant/RestaurantProfile";
import AddDonation from "../pages/Dashboard/Restaurant/AddDonation";
import MyDonation from "../pages/Dashboard/Restaurant/MyDonation";
import RequestedDonation from "../pages/Dashboard/Restaurant/RequestedDonation";
import AdminRoute from "../router/AdminRoute";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import ManageDonations from "../pages/Dashboard/Admin/ManageDonations";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageRequests from "../pages/Dashboard/Admin/ManageRequests";
import FeatureDonations from "../pages/Dashboard/Admin/FeatureDonations";
import ManageRoleRequests from "../pages/Dashboard/Admin/ManageRoleRequests";
import UpdateDonation from "../pages/Dashboard/Restaurant/UpdateDonation";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import DonationDetails from "../pages/Home/DonationDetails";
import AllDonations from "../pages/Home/AllDonations";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:'donation-details/:id',
        element:<PrivateRoute><DonationDetails></DonationDetails></PrivateRoute>,
      },
      {
        path:'all-donations',
        element:<PrivateRoute><AllDonations></AllDonations></PrivateRoute>,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      //user routes
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "request-charity",
        element: (
          <PrivateRoute>
            <RequestCharity></RequestCharity>
          </PrivateRoute>
        ),
      },
      {
        path: "favorites",
        element: (
          <PrivateRoute>
            <Favorites></Favorites>
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReview></MyReview>
          </PrivateRoute>
        ),
      },
      {
        path: "transactions",
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },
      //charity route
      {
        path: "charity-profile",
        element: (
          <PrivateRoute>
            <CharityRoute>
              <CharityProfile />
            </CharityRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-requests",
        element: (
          <PrivateRoute>
            <CharityRoute>
              <MyRequest />
            </CharityRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-pickups",
        element: (
          <PrivateRoute>
            <CharityRoute>
              <MyPickup />
            </CharityRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "received-donations",
        element: (
          <PrivateRoute>
            <CharityRoute>
              <ReceivedDonation />
            </CharityRoute>
          </PrivateRoute>
        ),
      },
      //restaurentroute
      {
        path: "restaurant-profile",
        element: (
          <PrivateRoute>
            <RestaurantRoute>
              <RestaurantProfile />
            </RestaurantRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-donation",
        element: (
          <PrivateRoute>
            <RestaurantRoute>
              <AddDonation />
            </RestaurantRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-donations",
        element: (
          <PrivateRoute>
            <RestaurantRoute>
              <MyDonation />
            </RestaurantRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "requested-donations",
        element: (
          <PrivateRoute>
            <RestaurantRoute>
              <RequestedDonation />
            </RestaurantRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "update-donation/:id",
        element: (
          <PrivateRoute>
            <RestaurantRoute>
              <UpdateDonation></UpdateDonation>
            </RestaurantRoute>
          </PrivateRoute>
        ),
      },
      //adimin routes
      {
        path: "admin-profile",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-donations",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageDonations />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-roles",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageRoleRequests />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-requests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageRequests />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "feature-donations",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <FeatureDonations />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);

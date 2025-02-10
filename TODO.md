# TODO List

## Backend

**Database Setup**:

- [x] Create MongoDB Atlas database and connect to it.

**Models**: Create Mongoose models for:

- [x] Coffees
- [x] Orders
- [x] Users

**Auth Routes**: Develop routes for:

- [x] Login
- [x] Signup
- [x] Admin signup

**Coffee Routes**: Develop routes for:

- [x] Get all coffees
- [x] Get coffee by ID
- [x] Add new coffee
- [x] Edit coffee details
- [x] Delete coffee

**User Routes**: Develop routes for:

- [x] Get all users
- [x] Get user by ID

**Database Services**:

- [x] Services for auth
- [x] Services for coffee
- [x] Services for

**Order Routes**: Develop routes for:

- [x] Get all orders
- [x] Get order by ID
- [x] Add new order
- [x] Update order status
- [x] Edit order details
- [ ] Delete order

---

## Frontend

- [ ] **Auth System**: Add token renewal functionality to maintain session.
- [ ] **Product Page**: Create a detailed single-product page (triggered when clicking a product card).
- [ ] **About Us Section**: Add a visually appealing and informative "About Us" section.
- [ ] **Product Filtering/Sorting**: Implement functionality to filter and sort products by:
  - Type
  - Price range: (low-to-high, high-to-low)
- [ ] **Product Images**: Get product images for all items.
- [ ] **Shopping Cart**: Develop a shopping cart page with functionality to:
  - View items
  - Edit quantities
  - Remove items
  - Display subtotal and total cost
- [ ] **Checkout Page**: Create a user-friendly checkout page for placing orders.

---

## Admin Dashboard

- [x] **Product/Inventory Management**: Add functionality to manage products and inventory.
- [x] **User Management**: Implement tools to manage user accounts.
- [ ] **Order Management**: Add functionality to view and update order statuses.
- [ ] **Sales Trends**: Display sales trend charts, including:
  - Revenue trends over time.
  - Top-selling products.
- [ ] **Fake Data**: Create fake sales data for testing the trend charts.

---

## UI Components

- [ ] **Footer Section**: Design and implement a responsive footer with:
  - Contact information
  - Social media links
  - Quick navigation links

## Bug fixes

- [ ] updated order status isn't returned in the response body, but is updated in database
- [ ] updated order details aren't returned in the response body, but are updated in database

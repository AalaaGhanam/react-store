# React Store

Welcome to the React Store project written in Typescript using ReactJS framework.

## App Structure and features
 
**Overview**
This is a React application built using Ant Design for UI components. It interacts with the Fake Store API (https://fakestoreapi.com/docs) to provide a seamless shopping experience.<br />
Below are the detailed features and structure of the app:<br />

**Features**
1. **Product Listing and Pagination:**<br />
- Fetches data from the Fake Store API and displays products in a grid layout.<br />
- Implements client-side pagination for easier navigation through the product catalog.<br />

2. **Product Cards:**<br />
- Each product is displayed as a card, showing essential information such as name, price, and a thumbnail image.<br />
- Includes a "View" button to navigate to detailed product information.<br />

3. **Product Details:**<br />
- Clicking "View" on a product redirects the user to a dedicated details page (http://localhost:3000/products/:id).<br />
- The details page includes a description, price, category, rating, and an option to add the product to the cart.<br />

4. **Add to Cart:**<br />
- Users can add products to their cart from the product details page.<br />
- Cart data is stored in localStorage, ensuring persistence across sessions.<br />

4. **Cart Overview:**<br />
- Provides a summary of items added to the cart, including the total number of items and their combined price.<br />
- Users can view the cart and remove individual items.<br />

5. **CFuture Enhancements:**<br />
- User Registration: Allow users to register and create accounts.<br />
- Checkout Logic: Users can proceed to make orders after registration, completing the shopping experience.<br />

## Installation

Before starting development, create a feature branch from the develop branch following this pattern
feature/{feature-name}/{description-of-change} .e.g. feature/card/product
Clone the repository and install project dependencies by running the below commands.

- Clone repository

```sh
git clone https://github.com/AalaaGhanam/react-store
```

- Install node dependencies

```sh
npm i
```

- Run Service

```sh
npm run start
```

- Run Throw Docker
```sh
# Run
docker-compose up --build

# Stop
docker-compose down
```

The React application will be accessible at http://localhost:3000/, and the output will be the produucts list screen.
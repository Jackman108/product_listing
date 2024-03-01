# Product Listing App

This is a React application for listing products fetched from an API. It allows users to filter products by name, price, and brand, and navigate through paginated results.


## Features

- Fetches product data from an API.
- Filters products by name, price, and brand.
- Paginates product results.
- Handles duplicate products with the same ID from the API.


## Installation

1. Clone the repository:

```bash
git clone <repository_url>
```
2. Navigate to the project directory:

```bash
cd product-listing
```
3. Install dependencies:

```bash
`npm install`
```
4. Create a .env file in the root directory and add the following:

```bash
REACT_APP_API_URL=http://api.valantis.store:40000/
REACT_APP_PASSWORD=Valantis
```
5. Start the development server:

```bash
npm start
```

## Usage

- Enter a product name, price, or select a brand from the dropdown to filter products.
- Use the pagination buttons to navigate through pages of products.

## Dependencies

- React: A JavaScript library for building user interfaces.
- React DOM: Provides DOM-specific methods that can be used at the top level of your app.
- React Scripts: Contains scripts and configuration used by Create React App.
- Axios: A promise-based HTTP client for making requests to the API.
- md5: A JavaScript library for generating MD5 hashes.
- Dotenv: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- Web Vitals: Library for measuring web performance metrics.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
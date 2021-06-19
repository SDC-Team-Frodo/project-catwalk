
# Project Catwalk

Project Catwalk is the client-facing UI for an e-commerce product detail page for a database of products stored
in a remote API.
## Features

Project Catwalk has four major components for the user to interact with
- Overview
- Related Products & Your Outfit
- Questions & Answers
- Ratings & Reviews

In addition to the major components, the project also includes
- Theme toggling
- Browse Page
- Search Functionality
## Demo

1. The overview section allows the user to navigate through different styles and images for the current product, and it allows the user to add the product to their cart

    https://recordit.co/hBRnJylTg2

2. The related products section displays the products (if any) related to the current product. The user can compare features between each related product and the current product and can navigate to the product detail page for each related product. The your outfit section allows the user to add the current product to their outfit and remove any previously added products

    http://recordit.co/Zm1L2sl4Ja

3. The Questions & Answers section allows the user to search for, ask, and answer questions about the product. The user can also mark answers as helpful and report them.

    https://recordit.co/LXUvfQFm1s

4. The Ratings and Reviews section allows the user to see the average ratings and all available reviews for a product. The user can sort reviews by different criteria, filter reviews by star ratings, and search for text in reviews. The user can also write new reviews, mark other reviews as helpful, and report reviews.

    https://recordit.co/aYPNpS3VCr

5. Theme, Search, and Browse

    https://recordit.co/W8BBmQzUiF
## Installation

1. Fork and clone the repository into your local
environment
```
  git clone <your-repo-url>
```
2. Install Project Catwalk with yarn (ensure you
are running node v14.16.0 or later)
```
  cd project-catwalk
  yarn
```
3. Create a .env file to store your API keys
```
  touch .env
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Github Personal Access Token -
`GIT_KEY`

Cloudinary API -
`CLOUD_NAME`
`API_KEY`
`API_SECRET`



## Run Locally

1. Navigate to the local repository
    ```
    cd <your-local-clone>
    ```

2. Build webpack bundles
  Development Mode
  ```
  yarn build:dev
  ```
  Production Mode
  ```
  yarn build:prod
  ```

3. Start server
  Development Mode
  ```
  yarn start:dev
  ```
  Production Mode
  ```
  yarn start:prod
  ```

**Note**: Run in development mode until you are deploying the application


## Authors

- [@aleceche](https://github.com/aleceche)
- [@franciskyao](https://github.com/franciskyao)
- [@Artey8](https://github.com/Artey8)
- [@ivangbailey](https://github.com/ivangbailey)

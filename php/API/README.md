# API Testing Guide with Insomnia

## Base URL

`http://localhost/API/api.php`

### Users

1. Create User

   - Method: POST
   - URL: `http://localhost/API/api.php?action=createUser`
   - JSON Body Example:

   ```json
   {
     "username": "testuser",
     "pass": "yourpassword"
   }
   ```

   - Body: x-www-form-urlencoded

   ```
   username: testuser
   pass: yourpassword
   ```

2. Get Users
   - Method: GET
   - URL: `http://localhost/API/api.php?action=getUsers`

### Products

1. Create Product

   - Method: POST
   - URL: `http://localhost/API/api.php?action=createProduct`
   - Body: x-www-form-urlencoded

   ```
   name: Test Product
   category: Electronics
   description: This is a test product
   ```

2. Get Products
   - Method: GET
   - URL: `http://localhost/API/api.php?action=getProducts`

### Reviews

1. Create Review

   - Method: POST
   - URL: `http://localhost/API/api.php?action=createReview`
   - Body: x-www-form-urlencoded

   ```
   user_id: 1
   product_id: 1
   rating: 5
   ```

2. Get Reviews
   - Method: GET
   - URL: `http://localhost/API/api.php?action=getReviews`

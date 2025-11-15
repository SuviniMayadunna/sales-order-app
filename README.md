# Sales Order Management System

A full-stack web application for managing sales orders with customer tracking, automatic calculations, and a professional user interface.

## Features

✅ **Customer Management** - Pre-configured customer database with address management
✅ **Sales Order Creation** - Create orders with automatic total calculations
✅ **Line Items** - Add multiple line items with quantity, price, and tax calculations
✅ **Order Tracking** - View all orders in a sortable data grid
✅ **Edit & Delete** - Modify existing orders or remove them
✅ **Automatic Calculations** - Real-time calculation of amounts including tax
✅ **Professional UI** - Modern, responsive design with intuitive navigation

## Tech Stack

### Frontend
- **React** 18.2.0
- **React Router** 6.20.0
- **Axios** 1.6.0
- **CSS3** with modern styling

### Backend
- **.NET Core** 10.0
- **ASP.NET Core** Web API
- **Entity Framework Core** 10.0.0
- **SQLite** database

## Getting Started

### Prerequisites
- **.NET SDK** 10.0 or higher
- **Node.js** 20.0 or higher
- **npm** 10.0 or higher

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sales-order-app.git
   cd sales-order-app
   ```

2. **Backend Setup**
   ```bash
   cd src/Server
   dotnet restore
   dotnet ef database update
   dotnet run
   ```
   Backend will start at: `http://localhost:5000`

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd src/Client
   npm install
   npm start
   ```
   Frontend will start at: `http://localhost:3000`

## Usage

### Creating a Sales Order
1. Click **"Add New"** button
2. Select a customer from the dropdown
3. Enter invoice details (date, reference number)
4. Add line items with:
   - Item code
   - Description
   - Quantity
   - Unit price
   - Tax percentage
5. Click **"Save Order"**
6. Totals are calculated automatically (Excl., Tax, Incl.)

### Managing Orders
- **View Orders**: Main grid displays all saved orders
- **Sort**: Click column headers to sort by any field
- **Edit**: Double-click a row to edit the order
- **Delete**: Use delete button to remove orders

## API Endpoints

### Sales Orders
- `GET /api/salesorders` - Get all orders
- `GET /api/salesorders/{id}` - Get order by ID
- `POST /api/salesorders` - Create new order
- `PUT /api/salesorders/{id}` - Update order
- `DELETE /api/salesorders/{id}` - Delete order

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/{id}` - Get customer by ID

### Documentation
- Swagger API docs available at: `http://localhost:5000/swagger`

## Database

- **Type**: SQLite
- **File**: `src/Server/SalesOrder.db`
- **Schema**: 3 tables (Customers, SalesOrders, SalesOrderLines)
- **Pre-seeded**: 3 sample customers included

## Project Structure

```
sales-order-app/
├── src/
│   ├── Client/           # React frontend
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   └── styles/
│   │   └── package.json
│   │
│   └── Server/           # .NET Core backend
│       ├── Controllers/
│       ├── Models/
│       ├── Services/
│       ├── Data/
│       └── Migrations/
│
├── .gitignore
├── README.md
└── SalesOrder.sln
```

## Development

### Running with Hot Reload
```bash
# Frontend
cd src/Client
npm start

# Backend (in another terminal)
cd src/Server
dotnet watch run
```

### Building for Production
```bash
# Frontend
cd src/Client
npm run build

# Backend
cd src/Server
dotnet publish -c Release
```

## Troubleshooting

### Backend won't start
- Ensure .NET 10.0 SDK is installed: `dotnet --version`
- Check if port 5000 is available
- Clear cache: `dotnet nuget locals all --clear`

### Frontend won't start
- Ensure Node.js 20+ is installed: `node --version`
- Delete node_modules: `rm -rf node_modules && npm install`
- Check if port 3000 is available

### Database issues
- Delete `SalesOrder.db` to reset
- Run migrations: `dotnet ef database update`

## License

This project is created for assessment purposes.

---

**Happy order managing!** 📦

3. **SQL Server or SQL Server LocalDB**   dotnet add package Microsoft.EntityFrameworkCore.Tools

   - SQL Server Express: https://www.microsoft.com/en-us/sql-server/sql-server-downloads   ```

   - SQL Server LocalDB comes with Visual Studio or can be installed separately

5. **Create a Data Model**:

4. **Visual Studio Code** (Optional but recommended)   Create a new folder named `Models` and add a class, e.g., `Product.cs`:

   - Download from: https://code.visualstudio.com/   ```csharp

   namespace MyWebApp.Api.Models

## Project Structure   {

       public class Product

```       {

sales-order-app/           public int Id { get; set; }

├── src/           public string Name { get; set; }

│   ├── Server/              # .NET Core Web API           public decimal Price { get; set; }

│   │   ├── Controllers/     # API controllers       }

│   │   ├── Models/          # Data models (Customer, SalesOrder, SalesOrderLine)   }

│   │   ├── Data/            # DbContext and migrations   ```

│   │   ├── Services/        # Business logic layer

│   │   ├── Program.cs       # Application entry point6. **Create a DbContext**:

│   │   └── appsettings.json # Configuration   Create a new folder named `Data` and add a class, e.g., `AppDbContext.cs`:

│   │   ```csharp

│   └── Client/              # React frontend   using Microsoft.EntityFrameworkCore;

│       ├── public/          # Static files   using MyWebApp.Api.Models;

│       ├── src/

│       │   ├── components/  # React components   namespace MyWebApp.Api.Data

│       │   ├── pages/       # Page components   {

│       │   ├── services/    # API services       public class AppDbContext : DbContext

│       │   └── styles/      # CSS files       {

│       └── package.json     # NPM dependencies           public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

│

└── README.md           public DbSet<Product> Products { get; set; }

```       }

   }

## Database Setup   ```



The application uses SQL Server LocalDB by default. The connection string is configured in `src/Server/appsettings.json`:7. **Configure the Database Connection**:

   Open `appsettings.json` and add your SQL Server connection string:

```json   ```json

"ConnectionStrings": {   "ConnectionStrings": {

  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=SalesOrderDb;Trusted_Connection=True;MultipleActiveResultSets=true"       "DefaultConnection": "Server=YOUR_SERVER;Database=MyWebAppDb;Trusted_Connection=True;"

}   }

```   ```



### If using SQL Server Express or full SQL Server:8. **Register the DbContext in `Startup.cs`**:

Update the connection string to:   ```csharp

```json   public void ConfigureServices(IServiceCollection services)

"ConnectionStrings": {   {

  "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=SalesOrderDb;Trusted_Connection=True;MultipleActiveResultSets=true"       services.AddDbContext<AppDbContext>(options =>

}           options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

```       services.AddControllers();

   }

Or for SQL Server authentication:   ```

```json

"ConnectionStrings": {9. **Create a Controller**:

  "DefaultConnection": "Server=localhost;Database=SalesOrderDb;User Id=your_username;Password=your_password;TrustServerCertificate=True"   Create a new folder named `Controllers` and add a class, e.g., `ProductsController.cs`:

}   ```csharp

```   using Microsoft.AspNetCore.Mvc;

   using MyWebApp.Api.Data;

## Installation & Setup   using MyWebApp.Api.Models;

   using System.Collections.Generic;

### Step 1: Install .NET Packages   using System.Linq;



Open a terminal/command prompt and navigate to the Server directory:   namespace MyWebApp.Api.Controllers

   {

```bash       [Route("api/[controller]")]

cd src/Server       [ApiController]

dotnet restore       public class ProductsController : ControllerBase

```       {

           private readonly AppDbContext _context;

### Step 2: Create Database Migration

           public ProductsController(AppDbContext context)

Create the initial database migration:           {

               _context = context;

```bash           }

dotnet ef migrations add InitialCreate

```           [HttpGet]

           public ActionResult<IEnumerable<Product>> GetProducts()

### Step 3: Update Database           {

               return _context.Products.ToList();

Apply the migration to create the database:           }



```bash           [HttpPost]

dotnet ef database update           public ActionResult<Product> CreateProduct(Product product)

```           {

               _context.Products.Add(product);

This will create the database with three tables:               _context.SaveChanges();

- **Customers** (with 3 sample customers)               return CreatedAtAction(nameof(GetProducts), new { id = product.Id }, product);

- **SalesOrders**           }

- **SalesOrderLines**       }

   }

### Step 4: Install Frontend Dependencies   ```



Open a new terminal and navigate to the Client directory:10. **Run Migrations**:

    ```bash

```bash    dotnet ef migrations add InitialCreate

cd src/Client    dotnet ef database update

npm install    ```

```

11. **Run the API**:

## Running the Application    ```bash

    dotnet run

You need to run both the backend and frontend simultaneously.    ```



### Option 1: Using Two Terminals (Recommended)### Step 2: Create the Frontend with React



**Terminal 1 - Backend API:**1. **Open a new terminal or command prompt**.

```bash2. **Navigate to the project directory**:

cd src/Server   ```bash

dotnet run   cd MyWebApp

```   ```

The API will start at: `http://localhost:5000`

Swagger documentation: `http://localhost:5000/swagger`3. **Create a new React application**:

   ```bash

**Terminal 2 - Frontend:**   npx create-react-app my-web-app-client

```bash   cd my-web-app-client

cd src/Client   ```

npm start

```4. **Install Axios for API calls**:

The React app will start at: `http://localhost:3000`   ```bash

   npm install axios

### Option 2: Using Visual Studio Code   ```



1. Open the project folder in VS Code5. **Create a Service for API Calls**:

2. Open two terminals (Terminal > New Terminal)   Create a new folder named `services` and add a file, e.g., `ProductService.js`:

3. In Terminal 1: `cd src/Server && dotnet run`   ```javascript

4. In Terminal 2: `cd src/Client && npm start`   import axios from 'axios';



### Option 3: Using Visual Studio   const API_URL = 'http://localhost:5000/api/products';



1. Open `src/Server/SalesOrder.Api.csproj` in Visual Studio   export const getProducts = async () => {

2. Press F5 to run the backend       const response = await axios.get(API_URL);

3. Open a separate terminal for frontend: `cd src/Client && npm start`       return response.data;

   };

## Using the Application

   export const createProduct = async (product) => {

1. **Access the application** at `http://localhost:3000`       const response = await axios.post(API_URL, product);

       return response.data;

2. **Home Page** displays a list of all sales orders   };

   ```

3. **Create New Order:**

   - Click "Add New Order" button6. **Create a Component to Display Products**:

   - Select a customer from the dropdown   Modify `src/App.js`:

   - Customer address details will auto-populate   ```javascript

   - Enter Invoice Number and Date   import React, { useEffect, useState } from 'react';

   - Add Reference Number and Notes (optional)   import { getProducts, createProduct } from './services/ProductService';

   - Click "Add Line" to add line items

   - Enter Item Code, Description, Quantity, Price, and Tax %   function App() {

   - Amounts will calculate automatically       const [products, setProducts] = useState([]);

   - Click "Save Order" to save       const [newProduct, setNewProduct] = useState({ name: '', price: 0 });



4. **Edit Order:**       useEffect(() => {

   - Click "Edit" button on any order in the list           const fetchProducts = async () => {

   - Modify the order details               const data = await getProducts();

   - Click "Save Order"               setProducts(data);

           };

5. **Delete Order:**           fetchProducts();

   - Click "Delete" button on any order       }, []);

   - Confirm deletion

       const handleSubmit = async (e) => {

## API Endpoints           e.preventDefault();

           const createdProduct = await createProduct(newProduct);

### Sales Orders           setProducts([...products, createdProduct]);

- `GET /api/salesorders` - Get all sales orders           setNewProduct({ name: '', price: 0 });

- `GET /api/salesorders/{id}` - Get single sales order       };

- `POST /api/salesorders` - Create new sales order

- `PUT /api/salesorders/{id}` - Update sales order       return (

- `DELETE /api/salesorders/{id}` - Delete sales order           <div>

               <h1>Products</h1>

### Customers               <ul>

- `GET /api/customers` - Get all customers                   {products.map(product => (

- `GET /api/customers/{id}` - Get single customer                       <li key={product.id}>{product.name} - ${product.price}</li>

                   ))}

Visit `http://localhost:5000/swagger` for interactive API documentation.               </ul>

               <form onSubmit={handleSubmit}>

## Database Schema                   <input

                       type="text"

### Customers Table                       placeholder="Product Name"

- CustomerId (PK)                       value={newProduct.name}

- CustomerName                       onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}

- Address1, Address2, Address3                   />

- Suburb                   <input

- State                       type="number"

- PostCode                       placeholder="Product Price"

                       value={newProduct.price}

### SalesOrders Table                       onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}

- SalesOrderId (PK)                   />

- CustomerId (FK)                   <button type="submit">Add Product</button>

- InvoiceNo               </form>

- InvoiceDate           </div>

- ReferenceNo       );

- Note   }

- TotalExcl

- TotalTax   export default App;

- TotalIncl   ```

- CreatedDate

- ModifiedDate7. **Run the React Application**:

   ```bash

### SalesOrderLines Table   npm start

- SalesOrderLineId (PK)   ```

- SalesOrderId (FK)

- ItemCode### Step 3: Test the Application

- Description

- Note1. **Ensure the .NET Core API is running** (usually on `http://localhost:5000`).

- Quantity2. **Open your browser and navigate to `http://localhost:3000`** to see your React application.

- Price3. **You should be able to see the list of products and add new products**.

- Tax

- ExclAmount### Conclusion

- TaxAmount

- InclAmountYou now have a basic web application with a .NET Core backend, a React frontend, and SQL Server as the database. You can expand this application by adding more features, such as authentication, validation, and more complex data models.

## Troubleshooting

### Backend Issues:

**Error: "dotnet command not found"**
- Install .NET SDK from https://dotnet.microsoft.com/download

**Error: "A network-related error occurred"**
- Ensure SQL Server LocalDB is installed
- Check the connection string in appsettings.json
- Try: `sqllocaldb start mssqllocaldb`

**Error: "The EntityFramework Core tools version is older"**
- Run: `dotnet tool update --global dotnet-ef`

**Port 5000 already in use:**
- Edit `src/Server/Properties/launchSettings.json` to use a different port
- Update the proxy in `src/Client/package.json` accordingly

### Frontend Issues:

**Error: "npm command not found"**
- Install Node.js from https://nodejs.org/

**Error: "Failed to load orders"**
- Ensure the backend API is running on port 5000
- Check browser console for CORS errors
- Verify the API URL in `src/Client/src/services/api.js`

**Port 3000 already in use:**
- The app will prompt to use a different port (e.g., 3001)
- Or manually kill the process using port 3000

## Technology Stack

### Backend:
- .NET 8.0
- ASP.NET Core Web API
- Entity Framework Core 8.0
- SQL Server
- Swashbuckle (Swagger)

### Frontend:
- React 18
- React Router 6
- Axios
- CSS3

## Sample Customers

The database is seeded with three sample customers:
1. **John Doe** - 123 Main Street, Springfield, NSW 2000
2. **Jane Smith** - 456 Queen Street, Melbourne, VIC 3000
3. **ABC Corporation** - 789 Business Park, Brisbane, QLD 4000

## Development Notes

- The backend API runs on port 5000
- The frontend development server runs on port 3000
- CORS is configured to allow requests from localhost:3000
- All amounts are calculated automatically based on quantity, price, and tax percentage
- Tax calculations use the formula: TaxAmount = ExclAmount × (Tax% / 100)

## Additional Commands

### Backend:
```bash
# Build the project
dotnet build

# Run tests (if any)
dotnet test

# Create a new migration
dotnet ef migrations add MigrationName

# Remove last migration
dotnet ef migrations remove

# List all migrations
dotnet ef migrations list
```

### Frontend:
```bash
# Build for production
npm run build

# Run tests
npm test

# Check for outdated packages
npm outdated

# Update packages
npm update
```

## License

This project is for assessment purposes.

## Support

For issues or questions, please check:
- Backend logs in the terminal running the API
- Browser console for frontend errors
- Network tab in browser dev tools for API call failures

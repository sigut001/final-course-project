const routPath = {
  admin: {
    get: {
      productManagement: "/productManagement",
      createProduct: "/admin-create-products",
      editProduct: "/admin-edit-product/:_id",
      viewAllOrders: "/admin-view-orders",
      apiCsrf: "/api/get-csrf-token",
    },
    post: {
      createProduct: "/admin-create-products",
      editProduct: "/admin-edit-product/:_id",
      deleteProduct: "/admin-delete-product/:_id",
    },
  },
  auth: {
    get: {
      logIn: "/getLogIn",
      signUp: "/getSignUp",
    },
    post: {
      signUp: "/postSignUp",
      logIn: "/postLogIn",
      logOut: "/postLogOut",
    },
  },
  basic: {
    get: {
      statusCode500: "/get500",
      default: "/",
    },
  },
  costumer: {
    get: {
      allOrders: "/costumer-orders",
    },
  },
  product: {
    get: {
      allProducts: "/products",
      singleProduct: "/getProductDetails/:_id",
    },
  },
};

const viewPath = {
  admin: {
    createProduct: "/views/admin/createProduct.ejs",
    editProduct: "/views/admin/editProduct.ejs",
    managementOrders: "/views/admin/managementOrders.ejs",
    managementProducts: "/views/admin/managementProducts.ejs",
    orderDetail: "/views/admin/orderDetail.ejs",
    productManagement: "/views/admin/productManagement.ejs",
    viewAdminOrders: "/views/admin/viewAdminOrders.ejs",
    included: {
      createForm: "/views/admin/included/createForm.ejs",
      dummyPreview: "/views/admin/included/dummyPreview.ejs",
      editForm: "/views/admin/included/editForm.ejs",
      productCard: "/views/admin/included/productCard.ejs",
      productDetail: "/views/admin/included/productDetail.ejs",
    },
  },
  auth: {
    logIn: "/views/auth/logIn.ejs",
    signUp: "/views/auth/signUp.ejs",
  },
  base: {
    e500: "/views/base/500.ejs",
    home: "/views/base/home.ejs",
  },
  costumer: {
    cart: "/views/costumer/cart.ejs",
    payment: "/views/costumer/payment.ejs",
    profile: "/views/costumer/profile.ejs",
    shop: "/views/costumer/shop.ejs",
    viewCostumerOrders: "/views/costumer/viewCostumerOrders.ejs",
    included: {
      productCard: "/views/costumer/included/productCard.ejs",
    },
  },
  included: {
    csrf: "/views/included/csrf.ejs",
    footer: "/views/included/footer.ejs",
    head: "/views/included/head.ejs",
    message: "/views/included/message.ejs",
    productCard: "/views/included/productCard.ejs",
    header: {
      desktopHeader: "/views/included/header/desktopHeader.ejs",
      header: "/views/included/header/header.ejs",
      mobileHeader: "/views/included/header/mobileHeader.ejs",
    },
  },
  product: {
    allProducts: "/views/product/allProducts.ejs",
    productDetails: "/views/product/productDetails.ejs",
    included: {
      dummyPreview: "/views/product/included/dummyPreview.ejs",
      productCard: "/views/product/included/productCard.ejs",
    },
  },
};

module.exports = {
  routPath: routPath,
  viewPath: viewPath,
};

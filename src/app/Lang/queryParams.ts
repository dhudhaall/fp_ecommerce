export const RouteParams = [
    {
      url: '/accounts',
      param: 'account/login'
    },
    // {
    //   url: '',
    //   param: 'module/account'
    // },
    // {
    //   url: '/',
    //   param: 'common/home'
    // },
    
    {
      url: '/',
      param: 'common/cart'
    },
  
    {
      url: '/searchproducts',
      param: 'product/search/partSearch'
    },
    {
      url: '/comparison',
      param: 'product/compare'
    },
    {
      url: '/checkout',
      param: 'checkout/checkout,account/account_transaction,account/account,total/sub_total,total/total,total/coupon'
    },
    {
      url: '/viewCart',
      param: 'checkout/cart'
    },
    {
      url: '/aboutUs',
      param: 'information/about'
    },
    {
      url: '/productDetail',
      param: 'product/product, product/search'
    },
    {
      url: '/wiperSearch',
      param: 'product/wiper,product/search'
    },
    {
      url: '/contactUs',
      param: 'information/contact'
    },
    {
      url: '/home/destination/createDestination',
      param: 'account/destination/edit'
    },
    {
      url: '/home/destination/editDestination',
      param: 'account/destination/edit'
    },
    {
      url: '/home/garage',
      param: 'account/shed'
    },
    {
      url: '/home/decodingRequests/addRequestToAddVehicle',
      param: 'account/vehicle'
    },
    {
      url: '/home/garage/addgarage',
      param: 'account/shed'
    },
    {
      url: '/home/decodingRequests',
      param: 'account/vehicle'
    },
    {
      url: '/home/stockRequests',
      param: 'account/stock_request'
    },
    {
      url: '/home/wishlist',
      param: 'account/wishlist'
    },
    {
      url: '/home/notificationsettings',
      param: 'account/newsletter'
    },
    {
      url: '/home/changepassword',
      param: 'account/password'
    },
    {
      url: '/home/editprofile',
      param: 'account/edit'
    },
    {
      url: '/home/invoices',
      param: 'account/order'
    },
    {
      url: '/home/transactions/tracking',
      param: 'account/order/info'
    },
    {
      url: '/aboutUs',
      param: ''
    },
    {
      url: '/contactUs',
      param: ''
    },
    {
      url: '/deliveryInformation',
      param: ''
    },
    {
      url: '/returnPolicy',
      param: ''
    },
    {
      url: '/privacyPolicy',
      param: ''
    },
    {
      url: '/termsConditions',
      param: ''
    },
    {
      url: '/braintree_success',
      param: 'checkout/success'
    },
    {
      url: '/paypal_success',
      param: 'checkout/success'
    }, {
      url: '/paypal_failed',
      param: 'checkout/failure'
    },
  ];
  
  export interface UrlParams {
    url: string,
    param: string;
  }
  
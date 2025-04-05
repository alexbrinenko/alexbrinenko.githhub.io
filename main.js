var app = new Vue({
  el: "#app",
  data: {
    products: [
      {
        id: 1,
        title: "Smooth Cayenne",
        short_text: "The most widely grown variety, ideal for canning due to its juicy, low-fiber flesh.",
        image: "img/pineapple1.jpg",
        desc: "This cylindrical fruit weighs 1.8–4.5 kg and is perfect for the global market. Orange peel, yellow flesh, moderately acidic.",
        plant: [
          "High-yielding variety grown worldwide."
        ],
        fruit: [
          "Cylindrical shape, orange skin, yellow flesh, juicy and low-fiber. Weight: 1.8–4.5 kg."
        ]
      },
      {
        id: 2,
        title: "MD-2",
        short_text: "Golden, sweet pineapple with long shelf life, developed by Del Monte.",
        image: "img/pineapple2.jpg",
        desc: "Very sweet (up to 17° Brix), low acidity (0.4–0.45%), cylindrical fruit weighing 1.5–2 kg with square shoulders.",
        plant: [
          "Widely adopted globally for commercial production."
        ],
        fruit: [
          "Golden flesh, small core, cylindrical shape, excellent shelf life. Weight: 1.5–2 kg."
        ]
      },
      {
        id: 3,
        title: "Red Spanish",
        short_text: "Barrel-shaped pineapple with orange skin and white flesh. Popular in the Caribbean.",
        image: "img/pineapple3.jpg",
        desc: "Weighs 0.8–2.25 kg, medium-sized with short, spiny leaves. Juicy and sweet with pleasant aroma.",
        plant: [
          "Hardy variety, commonly grown in the Caribbean and Central America."
        ],
        fruit: [
          "Barrel shape, orange skin, white flesh. Weight: 0.8–2.25 kg."
        ]
      },
      {
        id: 4,
        title: "Queen",
        short_text: "Small, aromatic pineapple, popular in South Africa and Australia.",
        image: "img/pineapple4.jpg",
        desc: "Fruit weighs 0.45–1.13 kg. Less fibrous, tender core, highly aromatic and juicy.",
        plant: [
          "Suitable for fresh consumption. Compact growth."
        ],
        fruit: [
          "Dark golden skin, small and aromatic. Weight: 0.45–1.13 kg."
        ]
      },
      {
        id: 5,
        title: "Sugarloaf",
        short_text: "Very sweet, white or yellow flesh. Not ideal for long transport due to soft texture.",
        image: "img/pineapple5.jpg",
        desc: "Conical to round shape, common in Cuba and the Philippines. Fruit weighs 0.68–1.36 kg.",
        plant: [
          "Soft-flesh variety grown locally for nearby markets."
        ],
        fruit: [
          "Very sweet, juicy flesh, white or yellow color. Weight: 0.68–1.36 kg."
        ]
      }
    ],
    product: {},
    btnVisible: 0,
    cart: [],
    contactFields: {},
    orderSubmitted: false
  },
  mounted: function () {
    this.getProduct();
    this.checkInCart();
    this.cart = this.getCart();
  },
  methods: {
    makeOrder: function () {
      console.log("Order placed. User information:", this.contactFields);
      this.cart = [];
      localStorage.removeItem("cart");
      this.orderSubmitted = true;
    },
    addToCart: function (id) {
      var cart = [];
      if (window.localStorage.getItem("cart")) {
        cart = window.localStorage.getItem("cart").split(",");
      }
      if (cart.indexOf(String(id)) === -1) {
        cart.push(id);
        window.localStorage.setItem("cart", cart.join(","));
        this.btnVisible = 1;
      }
    },
    getProduct: function () {
      if (window.location.hash) {
        var id = window.location.hash.replace("#", "");
        if (this.products.length > 0) {
          for (let i in this.products) {
            if (this.products[i].id == id) {
              this.product = this.products[i];
            }
          }
        }
      }
    },
    checkInCart: function () {
      let cart = window.localStorage.getItem("cart")
        ? window.localStorage.getItem("cart").split(",")
        : [];
      this.btnVisible = cart.includes(String(this.product.id)) ? 1 : 0;
    },
    getCart: function () {
      let storedCart = window.localStorage.getItem("cart")
        ? window.localStorage.getItem("cart").split(",")
        : [];
      let cart = [];
      storedCart.forEach(id => {
        let product = this.products.find(item => item.id == id);
        if (product) {
          cart.push(product);
        }
      });
      return cart;
    },
    removeFromCart: function (index) {
      let stored = window.localStorage.getItem("cart");
      if (!stored) return;
      let storedCart = stored.split(",");
      let product = this.cart[index];
      let idStr = String(product.id);
      let newCart = storedCart.filter(item => item !== idStr);
      window.localStorage.setItem("cart", newCart.join(","));
      this.cart.splice(index, 1);
    }
  }
});

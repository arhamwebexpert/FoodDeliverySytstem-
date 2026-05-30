// HomeSpice menu data (from the app's food_list / menu_list)
const A = '../../assets';

window.HS_CATEGORIES = [
  { name: 'Salads',     img: `${A}/menu/menu_1.png` },
  { name: 'Rolls',      img: `${A}/menu/menu_2.png` },
  { name: 'Deserts',    img: `${A}/menu/menu_3.png` },
  { name: 'Sandwiches', img: `${A}/menu/menu_4.png` },
  { name: 'Cakes',      img: `${A}/menu/menu_5.png` },
  { name: 'Vegetarian', img: `${A}/menu/menu_6.png` },
  { name: 'Pastas',     img: `${A}/menu/menu_7.png` },
  { name: 'Noodles',    img: `${A}/menu/menu_8.png` },
];

const D = 'Crafted fresh with quality ingredients — a neighbourhood favourite.';
window.HS_FOOD = [
  { id:1, name:'Ceaser Salad',      price:12, cat:'Salads',     img:`${A}/food/food_1.png` },
  { id:2, name:'Italian Salad',     price:18, cat:'Salads',     img:`${A}/food/food_2.png` },
  { id:3, name:'Spinach Salad',     price:16, cat:'Salads',     img:`${A}/food/food_3.png` },
  { id:4, name:'Chicken Salad',     price:24, cat:'Salads',     img:`${A}/food/food_4.png` },
  { id:5, name:'Lasagna Rolls',     price:14, cat:'Rolls',      img:`${A}/food/food_5.png` },
  { id:6, name:'Peri Peri Rolls',   price:12, cat:'Rolls',      img:`${A}/food/food_6.png` },
  { id:7, name:'Chicken Rolls',     price:20, cat:'Rolls',      img:`${A}/food/food_7.png` },
  { id:8, name:'Veg Rolls',         price:15, cat:'Rolls',      img:`${A}/food/food_8.png` },
  { id:9, name:'Ripple Ice Cream',  price:14, cat:'Deserts',    img:`${A}/food/food_9.png` },
  { id:10,name:'Fruit Ice Cream',   price:22, cat:'Deserts',    img:`${A}/food/food_10.png` },
  { id:11,name:'Jar Ice Cream',     price:10, cat:'Deserts',    img:`${A}/food/food_11.png` },
  { id:12,name:'Vanilla Ice Cream', price:12, cat:'Deserts',    img:`${A}/food/food_12.png` },
  { id:13,name:'Chicken Sandwich',  price:12, cat:'Sandwiches', img:`${A}/food/food_13.png` },
  { id:14,name:'Vegan Sandwich',    price:18, cat:'Sandwiches', img:`${A}/food/food_14.png` },
  { id:15,name:'Grilled Sandwich',  price:16, cat:'Sandwiches', img:`${A}/food/food_15.png` },
  { id:16,name:'Italian Sub',       price:24, cat:'Sandwiches', img:`${A}/food/food_16.png` },
  { id:17,name:'Cup Cake',          price:14, cat:'Cakes',      img:`${A}/food/food_17.png` },
  { id:18,name:'Vegan Cake',        price:12, cat:'Cakes',      img:`${A}/food/food_18.png` },
  { id:19,name:'Butterscotch Cake', price:20, cat:'Cakes',      img:`${A}/food/food_19.png` },
  { id:20,name:'Sliced Cake',       price:15, cat:'Cakes',      img:`${A}/food/food_20.png` },
  { id:21,name:'Garlic Mushroom',   price:14, cat:'Vegetarian', img:`${A}/food/food_21.png` },
  { id:22,name:'Fried Cauliflower', price:22, cat:'Vegetarian', img:`${A}/food/food_22.png` },
  { id:23,name:'Mix Veg Pulao',     price:10, cat:'Vegetarian', img:`${A}/food/food_23.png` },
  { id:24,name:'Rice Zucchini',     price:12, cat:'Vegetarian', img:`${A}/food/food_24.png` },
  { id:25,name:'Fettuccine Alfredo',price:12, cat:'Pastas',     img:`${A}/food/food_25.png` },
  { id:26,name:'Tomato Pasta',      price:18, cat:'Pastas',     img:`${A}/food/food_26.png` },
  { id:27,name:'Creamy Pasta',      price:16, cat:'Pastas',     img:`${A}/food/food_27.png` },
  { id:28,name:'Chicken Pasta',     price:24, cat:'Pastas',     img:`${A}/food/food_28.png` },
  { id:29,name:'Butter Noodles',    price:14, cat:'Noodles',    img:`${A}/food/food_29.png` },
  { id:30,name:'Veg Noodles',       price:12, cat:'Noodles',    img:`${A}/food/food_30.png` },
  { id:31,name:'Somen Noodles',     price:20, cat:'Noodles',    img:`${A}/food/food_31.png` },
  { id:32,name:'Cooked Noodles',    price:15, cat:'Noodles',    img:`${A}/food/food_32.png` },
].map(f => ({ ...f, desc: D }));

window.HS_ASSETS = {
  logo:`${A}/logo.png`, hero:`${A}/header_img.png`, search:`${A}/search_icon.png`,
  basket:`${A}/basket_icon.png`, addWhite:`${A}/add_icon_white.png`, addGreen:`${A}/add_icon_green.png`,
  removeRed:`${A}/remove_icon_red.png`, rating:`${A}/rating_starts.png`, appStore:`${A}/app_store.png`,
  playStore:`${A}/play_store.png`, facebook:`${A}/facebook_icon.png`, twitter:`${A}/twitter_icon.png`,
  linkedin:`${A}/linkedin_icon.png`,
};

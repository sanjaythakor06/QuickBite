let isLogin=true;
let users=[];
let currentUser="";
let cart=[];
let total=0;
let orders=[];

let products=[
   {name:"Pizza",price:120,img:"images/pizza.jpg"},
  {name:"Samosa",price:70,img:"images/samosa.jpg"},
  {name:"Dabeli",price:70,img:"images/dabeli.jpg"},
  {name:"Vada Pav",price:60,img:"images/vadaPav.jpg"},
  {name:"Burger",price:80,img:"images/barger.jpg"},
  {name:"Sandwich",price:80,img:"images/sandwich.jpg"},
  {name:"Grilled Sandwich",price:100,img:"images/gSandwich.jpg"},
  {name:"French Fries", price:70,img:"images/Frenchfries.jpg"},
  {name:"Masala Fries", price:90,img:"images/Masalafries.jpg"},
  {name:"Cold Drink", price:60,img:"images/colddr.jpg"},
  {name:"Coca Cola", price:65,img:"images/coca.jpg"},
  {name:"Pepsi", price:50,img:"images/pepsi.jpg"},
  {name:"Maggie", price:60,img:"images/megi.jpg"},
  {name:"Cheese Maggie", price:100,img:"images/chmagi.jpg"},
  {name:"Manchurian", price:150,img:"images/manchurr.jpg"},
  {name:"Noodles", price:120,img:"images/nudel.jpg"},
  {name:"Fried Rice", price:140,img:"images/frice.jpg"},
  {name:"Paneer Tikka", price:180,img:"images/paneer.jpg"},
  {name:"Chole Bhature", price:150,img:"images/cholebh.png"},
  {name:"Aloo Paratha", price:75,img:"images/aloo.png"},
  {name:"Tea", price:50,img:"images/tea.jpg"},
  {name:"Coffee", price:60,img:"images/cofee.jpg"}

];

function renderProducts(){
  let box=document.getElementById("products");
  box.innerHTML="";
  products.forEach(p=>{
    box.innerHTML+=`<div class="product">
      <img src="${p.img}">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <button onclick="addToCart('${p.name}',${p.price}, this)">Add</button>
      <button onclick="directOrder('${p.name}',${p.price})">Order Now</button>
    </div>`;
  });
}

function toggleAuth(){
  isLogin=!isLogin;
  document.getElementById('title').innerText=isLogin?'Login':'Register';
  document.getElementById('toggleText').innerText=isLogin?'New user? Register':'Already user? Login';

  ['fname','lname','regNumber','regPassword','confirmPassword'].forEach(id=>{
    document.getElementById(id).style.display=isLogin?'none':'block';
  });
  ['loginNumber','loginPassword'].forEach(id=>{
    document.getElementById(id).style.display=isLogin?'block':'none';
  });
}

function handleAuth(){
  if(isLogin){
    let num=document.getElementById('loginNumber').value;
    let pass=document.getElementById('loginPassword').value;
    let user=users.find(u=>u.num===num && u.pass===pass);
    if(!user){alert('Invalid login');return}
    currentUser=num;
    document.getElementById('auth').style.display='none';
    document.getElementById('navbar').style.display='flex';
    document.getElementById('main').style.display='block';
    renderProducts();
  } else {
    let num=document.getElementById('regNumber').value;
    let pass=document.getElementById('regPassword').value;
    let confirm=document.getElementById('confirmPassword').value;
    if(num.length!=10||pass.length<6||pass!==confirm){alert('Invalid data');return}
    users.push({num,pass});
    alert('Registered');
    toggleAuth();
  }
}

function logout(){
  location.reload();
}

function addToCart(name,price,btn){
  cart.push({name,price});
  total+=price;
  updateCart();

  // 👇 button change
  btn.innerText = "Added ✅";
  btn.style.background = "green";

  // optional: 2 sec baad wapas normal
  setTimeout(()=>{
    btn.innerText = "Add";
    btn.style.background = "#ff5722";
  },2000);
}

function updateCart(){
  let list=document.getElementById('cartItems');
  list.innerHTML="";
  cart.forEach(i=>{
    list.innerHTML+=`<li>${i.name} - ₹${i.price}</li>`;
  });
  document.getElementById('total').innerText=total;
}

function toggleCart(){
  let c=document.getElementById('cart');
  c.style.display=c.style.display==='block'?'none':'block';
}

function openOrder(){
  document.getElementById('popup').style.display='flex';
}

function directOrder(name,price){
  cart=[{name,price}];
  total=price;
  updateCart();
  openOrder();
}

function submitOrder(){

  let number=document.getElementById('number').value;

  if(number.length!=10){
    alert('Enter valid number');
    return;
  }

  let name=document.getElementById('name').value;
  let address=document.getElementById('address').value;

  orders.push({
    name:name,
    number:number,
    address:address,
    items:cart,
    total:total
  });

  alert('Order Success');
  cart=[];
  total=0;
  updateCart();
  document.getElementById('popup').style.display='none';
}

function showHistory(){
  let h=document.getElementById('history');
  let list=document.getElementById('historyList');

  h.style.display='flex';
  list.innerHTML="";

  orders.forEach(o=>{

    // 👇 ye important line
    let items = o.items.map(i => i.name).join(", ");

    list.innerHTML += `
      <li>
        <b>${o.name}</b> (${o.number}) <br>
        📍 ${o.address} <br>
        🍔 ${items} <br>
        💰 ₹${o.total}
      </li>
      <hr>
    `;
  });
}

function closeHistory(){
  document.getElementById('history').style.display='none';
}

function searchProduct(){
  let val=document.getElementById('search').value.toLowerCase();
  let filtered=products.filter(p=>p.name.toLowerCase().includes(val));
  let box=document.getElementById("products");
  box.innerHTML="";

  filtered.forEach(p=>{
    box.innerHTML+=`<div class="product">
      <img src="${p.img}">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <button onclick="addToCart('${p.name}',${p.price})">Add</button>
      <button onclick="directOrder('${p.name}',${p.price})">Order Now</button>
    </div>`;
  });

  // agar search empty ho jaye
  if(val.trim() === ""){
    renderProducts();
  }
}
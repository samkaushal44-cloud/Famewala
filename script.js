// 🔥 GENERATE ORDER ID
function generateOrderId() {
  return "FW" + Math.floor(100000 + Math.random() * 900000);
}

// 🔥 ALL SERVICES
const services = {

  youtube: {
    name: "YouTube",
    desc: "Grow your channel",
    color: "linear-gradient(45deg,#ff416c,#ff4b2b)",
    plans: [
      { name: "1000 Views ⚡", price: 49 },
      { name: "5000 Views 🔥", price: 99 }
    ]
  },

  instagram: {
    name: "Instagram",
    desc: "Boost followers",
    color: "linear-gradient(45deg,#ff6a00,#ee0979)",
    plans: [
      { name: "1K Followers 🔥", price: 79 },
      { name: "5K Followers ⭐", price: 149 }
    ]
  },

  facebook: {
    name: "Facebook",
    desc: "Connect people",
    color: "linear-gradient(45deg,#396afc,#2948ff)",
    plans: [
      { name: "1K Likes", price: 49 }
    ]
  },

  telegram: {
    name: "Telegram",
    desc: "Grow channel",
    color: "linear-gradient(45deg,#00c6ff,#0072ff)",
    plans: [
      { name: "1K Members", price: 79 }
    ]
  },

  netflix: {
    name: "Netflix",
    desc: "Watch shows",
    color: "linear-gradient(45deg,#ff0000,#8b0000)",
    plans: [
      { name: "1 Month HD", price: 29 }
    ]
  },

  spotify: {
    name: "Spotify",
    desc: "Music",
    color: "linear-gradient(45deg,#1db954,#0f9b0f)",
    plans: [
      { name: "1 Month Premium", price: 29 }
    ]
  },

  prime: {
    name: "Amazon Prime",
    desc: "Movies",
    color: "linear-gradient(45deg,#2193b0,#6dd5ed)",
    plans: [
      { name: "1 Month", price: 39 }
    ]
  },

  disney: {
    name: "Disney+ Hotstar",
    desc: "OTT",
    color: "linear-gradient(45deg,#373b44,#4286f4)",
    plans: [
      { name: "1 Month", price: 39 }
    ]
  }

};

// 🔥 OPEN SERVICE
function openService(serviceKey) {
  localStorage.setItem("selectedService", serviceKey);
  window.location.href = "plans.html";
}

// 🔥 LOAD PLANS
function loadPlans() {

  const key = localStorage.getItem("selectedService");
  const service = services[key];

  document.getElementById("serviceName").innerText = service.name + " Plans";
  document.getElementById("serviceDesc").innerText = service.desc;
  document.getElementById("serviceBox").style.background = service.color;

  let html = "";

  service.plans.forEach(p => {
    html += `
      <div class="plan-card">
        <div>
          <h3>${p.name}</h3>
          <p>⚡ Fast Delivery</p>
        </div>
        <button class="plan-btn"
        onclick="buyNow('${service.name}','${p.name}',${p.price})">
        ₹${p.price} →
        </button>
      </div>
    `;
  });

  document.getElementById("plansContainer").innerHTML = html;
}

// 🔥 BUY
function buyNow(service, plan, price) {
  localStorage.setItem("orderService", service);
  localStorage.setItem("orderPlan", plan);
  localStorage.setItem("orderPrice", price);
  window.location.href = "payment.html";
}

// 🔥 LOAD PAYMENT + SMART FORM
function loadPayment() {

  const service = localStorage.getItem("orderService");
  const plan = localStorage.getItem("orderPlan");
  const price = localStorage.getItem("orderPrice");

  document.getElementById("orderText").innerText =
    `${service} | ${plan} | ₹${price}`;

  const upi = `upi://pay?pa=8219503445-3@ybl&pn=FameWala&am=${price}&cu=INR`;

  document.getElementById("qr").src =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(upi);

  const input = document.getElementById("userInput");
  const email = document.getElementById("userEmail");

  // 🔥 SMART INPUT CHANGE
  if(service === "Instagram" || service === "YouTube" || service === "Facebook"){
    input.placeholder = "Enter Username / Link";
    email.style.display = "none";
  }
  else if(service === "Telegram"){
    input.placeholder = "Enter Channel Link";
    email.style.display = "none";
  }
  else{
    input.placeholder = "Enter Name";
    email.placeholder = "Enter Email (for OTT login)";
    email.style.display = "block";
  }

}

// 🔥 SUBMIT ORDER (HYBRID)
function submitOrder() {

  const utr = document.getElementById("utr").value;
  const userInput = document.getElementById("userInput").value;
  const userEmail = document.getElementById("userEmail").value;

  if (!utr || utr.length < 8) {
    alert("Enter valid UTR ❌");
    return;
  }

  if (!userInput) {
    alert("Enter required details ❌");
    return;
  }

  const service = localStorage.getItem("orderService");
  const plan = localStorage.getItem("orderPlan");
  const price = localStorage.getItem("orderPrice");

  const orderId = generateOrderId();

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.push({
    id: orderId,
    service,
    plan,
    price,
    utr,
    userInput,
    userEmail,
    status: "Processing ⏳"
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  // 🔥 TELEGRAM
  const BOT_TOKEN = "8772461049:AAGbsFSIDCimgTgO8IMQdGSKMjfaG8G2IhE";
  const CHAT_ID = "7407239965";

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: `🔥 NEW ORDER

ID: ${orderId}
Service: ${service}
Plan: ${plan}
Price: ₹${price}

User: ${userInput}
Email: ${userEmail}

UTR: ${utr}`
    })
  });

  // SUCCESS PAGE
  localStorage.setItem("successOrderId", orderId);
  localStorage.setItem("successService", service);
  localStorage.setItem("successPlan", plan);
  localStorage.setItem("successPrice", price);

  window.location.href = "success.html";
}

// 🔥 TRACK
function goTrack(){
  window.location.href = "track.html";
}

// 🔥 GLOBAL FIX
window.openService = openService;
window.loadPlans = loadPlans;
window.buyNow = buyNow;
window.loadPayment = loadPayment;
window.submitOrder = submitOrder;
window.goTrack = goTrack;

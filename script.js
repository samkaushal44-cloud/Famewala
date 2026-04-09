// 🔥 GENERATE ORDER ID
function generateOrderId() {
  return "FW" + Math.floor(100000 + Math.random() * 900000);
}

// 🔥 ALL SERVICES DATA
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
    desc: "Music & podcasts",
    color: "linear-gradient(45deg,#1db954,#0f9b0f)",
    plans: [
      { name: "1 Month Premium", price: 29 }
    ]
  }

};


// 🔥 OPEN SERVICE
function openService(serviceKey) {
  localStorage.setItem("selectedService", serviceKey);
  window.location.href = "plans.html";
}


// 🔥 LOAD PLANS PAGE
function loadPlans() {

  const key = localStorage.getItem("selectedService");

  if (!key || !services[key]) {
    document.body.innerHTML = "<h2 style='text-align:center'>Service Not Found ❌</h2>";
    return;
  }

  const service = services[key];

  document.getElementById("serviceName").innerText = service.name + " Plans";
  document.getElementById("serviceDesc").innerText = service.desc;
  document.querySelector(".box").style.background = service.color;

  const container = document.getElementById("plansContainer");
  container.innerHTML = "";

  service.plans.forEach(plan => {
    container.innerHTML += `
      <div class="plan-card">
        <div>
          <h4>${plan.name}</h4>
          <p>⚡ Fast Delivery</p>
        </div>
        <button onclick="buyNow('${service.name}','${plan.name}',${plan.price})">
          ₹${plan.price} →
        </button>
      </div>
    `;
  });

}


// 🔥 BUY PAGE REDIRECT
function buyNow(service, plan, price) {
  localStorage.setItem("orderService", service);
  localStorage.setItem("orderPlan", plan);
  localStorage.setItem("orderPrice", price);
  window.location.href = "payment.html";
}


// 🔥 SUBMIT ORDER + TELEGRAM + POPUP
function submitOrder() {

  const utr = document.getElementById("utr").value;

  if (!utr || utr.length < 8) {
    alert("Enter valid UTR ❌");
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
    status: "Processing ⏳"
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.setItem("lastOrderId", orderId);

  // 🔥 TELEGRAM SETTINGS (CHANGE THIS)
  const BOT_TOKEN = "8772461049:AAGbsFSIDCimgTgO8IMQdGSKMjfaG8G2IhE";
  const CHAT_ID = "7407239965";

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: `🔥 NEW ORDER

🆔 ID: ${orderId}
📦 Service: ${service}
📋 Plan: ${plan}
💰 Price: ₹${price}
🔑 UTR: ${utr}

⏳ Status: Pending`
    })
  })
  .then(() => console.log("Telegram Sent ✅"))
  .catch(() => console.log("Telegram Error ❌"));

  // 🔥 SUCCESS POPUP
  document.getElementById("successBox").style.display = "block";
  document.getElementById("orderText").innerText = "Your Order ID: " + orderId;
}


// 🔥 CLOSE POPUP
function closeBox(){
  document.getElementById("successBox").style.display = "none";
  window.location.href = "track.html";
}
function loadPlans() {

  const key = localStorage.getItem("selectedService");
  const service = services[key];

  document.getElementById("serviceName").innerText = service.name + " Plans";
  document.getElementById("serviceDesc").innerText = service.desc;

  // 🔥 COLOR FIX
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

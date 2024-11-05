// Configuration and Data
const plans = [
  {
    name: "Basic",
    price: 5,
    features: {
      "Basic Wash": true,
      Maintenance: false,
      Diagnostics: false,
      Wrapping: false,
    },
  },
  {
    name: "Premium",
    price: 10,
    features: {
      "Basic Wash": true,
      Maintenance: false,
      Diagnostics: true,
      Wrapping: false,
    },
  },
  {
    name: "Ultimate",
    price: 15,
    features: {
      "Basic Wash": true,
      Maintenance: true,
      Diagnostics: true,
      Wrapping: true,
    },
  },
];

const conversionRates = {
  USD: { symbol: "$", rate: 1, position: "before" },
  EUR: { symbol: "€", rate: 0.91, position: "before" },
  DZD: { symbol: "DA", rate: 134.5, position: "after" },
};

// Utility Functions
function formatPrice(priceUSD, currency) {
  const { symbol, rate, position } = conversionRates[currency];
  const converted = priceUSD * rate;

  if (currency === "DZD") {
    return position === "before"
      ? `${symbol}${Math.round(converted)}`
      : `${Math.round(converted)} ${symbol}`;
  }

  return position === "before"
    ? `${symbol}${converted.toFixed(2)}`
    : `${converted.toFixed(2)} ${symbol}`;
}

function renderPricingCards(currency) {
  const pricingGrid = document.getElementById("pricingGrid");
  pricingGrid.innerHTML = "";

  plans.forEach((plan) => {
    const card = document.createElement("div");
    card.className = "pricing-card";

    const formattedPrice = formatPrice(plan.price, currency);
    const originalPrice = currency !== "USD" ? `($${plan.price} USD)` : "";

    const templateCard = document.getElementById("card-template");
    const cardClone = templateCard.content.cloneNode(true);

    // Fill in the template with data
    cardClone.querySelector(".plan-name").textContent = plan.name;
    cardClone.querySelector(".plan-price").textContent = formattedPrice;
    cardClone.querySelector(".original-price").textContent = originalPrice;

    const featureList = cardClone.querySelector(".feature-list");
    Object.entries(plan.features).forEach(([feature, included]) => {
      const li = document.createElement("li");
      li.className = "feature-item";
      li.innerHTML = `
        <span>${feature}</span>
        <span style="color: ${included ? "#22c55e" : "#ef4444"}">
          ${included ? "✓" : "✕"}
        </span>
      `;
      featureList.appendChild(li);
    });

    cardClone.querySelector(".select-btn").textContent = `Select ${plan.name}`;

    pricingGrid.appendChild(cardClone);
  });
}

// Currency Selection
const currencySelect = document.getElementById("currencySelect");
currencySelect.addEventListener("change", (e) => {
  renderPricingCards(e.target.value);
});

// Initial Render
document.addEventListener("DOMContentLoaded", () => {
  renderPricingCards("USD");
});

// Handle Window Resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("active");
  }
});

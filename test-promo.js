// Test script for promo code validation and application
// Reuses the same logic as BookingForm.tsx

const fetch = require('node-fetch'); // You'll need to install node-fetch: npm install node-fetch

async function validatePromoCode(promoCode, amount = 100) {
  const cleanedPromoCode = promoCode.trim().toUpperCase();

  // ---------- FRONTEND VALIDATION (same as BookingForm) ----------
  if (!cleanedPromoCode) {
    console.error("❌ Please enter a promo code.");
    return;
  }

  if (cleanedPromoCode.length < 3) {
    console.error("❌ Promo code must be at least 3 characters.");
    return;
  }

  if (!/^[A-Z0-9]+$/.test(cleanedPromoCode)) {
    console.error("❌ Promo code can only contain letters and numbers.");
    return;
  }

  try {
    console.log(`🔍 Validating promo code: ${cleanedPromoCode}`);

    // ---------- CALL LOCAL VALIDATE API (same as BookingForm) ----------
    const validateResponse = await fetch('http://localhost:3000/api/promo-codes/validate', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ promoCode: cleanedPromoCode })
    });

    // Prevent JSON crash
    let validateResult;
    try {
      validateResult = await validateResponse.json();
    } catch {
      console.error("❌ Server error. Please try again.");
      return;
    }

    console.log("✅ VALIDATE RESULT:", validateResult);

    if (!validateResult.success || !validateResult.valid) {
      console.error(`❌ ${validateResult.message || "Invalid promo code"}`);
      return;
    }

    // ---------- CALL LOCAL APPLY API (same as BookingForm) ----------
    console.log(`💰 Applying promo code to amount: $${amount}`);

    const applyResponse = await fetch('http://localhost:3000/api/promo-codes/apply', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        promoCode: cleanedPromoCode,
        amount: amount
      })
    });

    const applyResult = await applyResponse.json();
    console.log("✅ APPLY RESULT:", applyResult);

    if (!applyResult.success) {
      console.error(`❌ ${applyResult.message || "Failed to apply promo."}`);
      return;
    }

    // ---------- APPLY SUCCESS (same as BookingForm) ----------
    console.log("🎉 Promo code applied successfully!");
    console.log(`💸 Original Amount: $${applyResult.data.originalAmount}`);
    console.log(`💸 Discount: ${applyResult.data.discountPercentage}%`);
    console.log(`💸 Discount Amount: $${applyResult.data.discountAmount}`);
    console.log(`💰 Final Amount: $${applyResult.data.finalAmount}`);
    console.log(`🏷️ Promo Code: ${applyResult.data.promoCode}`);
    console.log(`🆔 Promo Code ID: ${applyResult.data.promoCodeId}`);

    if (applyResult.data.agentInfo) {
      console.log(`👤 Agent: ${applyResult.data.agentInfo.agentName} (${applyResult.data.agentInfo.agentId})`);
    }

    if (applyResult.data.remainingUsage !== null) {
      console.log(`🔢 Remaining Usage: ${applyResult.data.remainingUsage}`);
    }

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

// Test the function
async function runTests() {
  console.log("🚀 Starting Promo Code Tests...\n");

  // Test cases
  const testCases = [
    { code: "TEST10", amount: 200 },
    { code: "INVALID", amount: 100 },
    { code: "EXPIRED", amount: 150 },
    { code: "LIMITED", amount: 300 }
  ];

  for (const test of testCases) {
    console.log(`\n--- Testing: ${test.code} ---`);
    await validatePromoCode(test.code, test.amount);
    console.log(""); // Empty line between tests
  }
}

// Run tests if called directly
if (require.main === module) {
  runTests();
}

module.exports = { validatePromoCode };

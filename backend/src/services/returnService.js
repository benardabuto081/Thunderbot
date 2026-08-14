/**
 * Checks if an item or customer is eligible for a return.
 * Optimised to handle partial data (just item and date) or full customer verification.
 * 
 * @param {Object} item - Product information.
 * @param {number} daysSinceDelivery - Time passed since arrival.
 * @param {Object} context - Optional data for advanced business rules.
 * @returns {Object} { isEligible: boolean, reason: string }
 */
function checkReturnEligibility(item, daysSinceDelivery, context = {}) {
    // ----------------------------------------------------
    // PRIORITY RULE: The 30-Day Window (Always runs)
    // ----------------------------------------------------
    if (daysSinceDelivery > 30) {
        return { isEligible: false, reason: "The 30-day return window has expired." };
    }

    // If Engineer 2 ONLY sent item and date, stop here and approve!
    if (!context.orderId && context.customerRefundsThisMonth === undefined) {
        return { isEligible: true, reason: "Item is within the 30-day return window." };
    }

    // ----------------------------------------------------
    // FRAUD & ADMINISTRATIVE CHECKS
    // ----------------------------------------------------
    // Check 1: Return Frequency Limit
    if (context.customerRefundsThisMonth > 5) {
        return { isEligible: false, reason: "User is ineligible due to having more than 5 refunds in one month." };
    }

    // Check 2: Receipt Match
    if (context.orderId !== context.buyerEmailOrderIdMatch) {
        return { isEligible: false, reason: "Incorrect product. Order ID does not match buyer email records." };
    }

    // Check 3: Serial Number Match for expensive gear
    if (item.category === "electronics" && item.price >= 200 && context.serialNumberMatches === false) {
        return { isEligible: false, reason: "Serial number does not match our store records." };
    }

    // ----------------------------------------------------
    // PRODUCT TYPE RESTRICTIONS
    // ----------------------------------------------------
    if (item.isClearance) {
        return { isEligible: false, reason: "Clearance and final sale items cannot be returned." };
    }

    const category = item.category?.toLowerCase();
    if (category === "food" || category === "flowers") {
        return { isEligible: false, reason: "Perishable items like food or flowers cannot be returned." };
    }

    if (category === "undergarments" || category === "earrings") {
        return { isEligible: false, reason: "Hygiene restrictions apply. Undergarments and earrings are non-returnable." };
    }

    if (category === "software" || category === "giftcard") {
        return { isEligible: false, reason: "Digital products like software or gift cards are non-refundable." };
    }

    // ----------------------------------------------------
    // ITEM CONDITION & STATE CHECKS
    // ----------------------------------------------------
    if (context.itemCondition === "broken") {
        return { isEligible: true, reason: "Item state verified as broken. Proceeding with immediate refund processing." };
    }

    if (category === "electronics" && context.isSealed === false) {
        return { isEligible: false, reason: "Electronics must still be sealed in original packaging." };
    }

    if (category === "clothing" && context.hasTags === false) {
        return { isEligible: false, reason: "Clothing must have original tags attached." };
    }

    if (context.itemCondition === "used" && context.hasMissingParts === true) {
        return { isEligible: false, reason: "Return rejected due to missing parts on used item." };
    }

    // Fallback Success
    return { isEligible: true, reason: "This item is eligible for a return." };
}

module.exports = { checkReturnEligibility };
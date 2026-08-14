/**
 * Processes financial logic and dynamic messaging for approved returns.
 * 
 * @param {Object} item - Product information.
 * @param {Object} context - Financial and customer membership context variables.
 * @returns {Object} Complete breakdown of monetary values and bot instructions.
 */
function processRefundDetails(item, context = {}) {
    const baseRefundAmount = item.price;
    let messageNotes = [];

    // Safe default if Engineer 2 only sent minimal data
    if (!context.tier) {
        return {
            refundAmount: baseRefundAmount,
            message: "Refund policy prioritized. Full refund calculated based on time criteria."
        };
    }

    // Extra Safe Check: Store security logic
    if (baseRefundAmount <= 0) {
        return { refundAmount: 0, message: "Error: Refund balance cannot be zero or negative." };
    }

    // ----------------------------------------------------
    // FEE AND WAIVER LOGIC PROCESSING
    // ----------------------------------------------------
    // Rule 1: VIP Priority Status
    if (context.tier === "VIP") {
        messageNotes.push("The return will be free because the user is a VIP loyalty member.");
    } else {
        // Rule 2: Restocking notification for opened merchandise
        if (context.isBoxOpened === true) {
            messageNotes.push("Customer will incur a restocking fee for opened boxes.");
        }

        // Rule 3: Self-Shipping Fees
        if (context.returnReason === "changed_mind" && context.itemCondition !== "damaged") {
            messageNotes.push("Customer will incur the return shipping fee because they changed their mind on a non-damaged item.");
        }
    }

    // Format individual alerts into a clean string for Engineer 2
    const finalNotification = messageNotes.length > 0 
        ? messageNotes.join(" ") 
        : "Standard return processed successfully.";

    return {
        refundAmount: baseRefundAmount,
        message: finalNotification
    };
}

module.exports = { processRefundDetails };

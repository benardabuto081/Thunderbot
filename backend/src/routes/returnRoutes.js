const express = require('express');
const router = express.Router();

// Import the two logic functions you already created!
const { checkReturnEligibility } = require('../services/returnService');
const { processRefundDetails } = require('../services/refundService');

/**
 * API Endpoint: POST /api/returns/check
 * This is the door Engineer 2 will knock on to verify eligibility and pricing.
 */
router.post('/check', (req, res) => {
    try {
        // 1. Grab the incoming data package sent by Engineer 2
        const { item, daysSinceDelivery, context } = req.body;

        // Validation Guard: Ensure essential ingredients exist
        if (!item || daysSinceDelivery === undefined) {
            return res.status(400).json({
                success: false,
                error: "Missing required parameters: 'item' and 'daysSinceDelivery' are mandatory."
            });
        }

        // 2. Run your first file: Check if they are allowed to return it
        const eligibilityResult = checkReturnEligibility(item, daysSinceDelivery, context);

        // If your logic block says NO, stop immediately and send the reason back to the bot
        if (!eligibilityResult.isEligible) {
            return res.status(200).json({
                success: true,
                isEligible: false,
                reason: eligibilityResult.reason,
                refundAmount: 0,
                message: "Return request denied based on store business policies."
            });
        }

        // 3. Run your second file: If eligible, calculate the financial refund/fees
        const refundResult = processRefundDetails(item, context);

        // 4. Send the combined, successful response back over the network to Engineer 2
        return res.status(200).json({
            success: true,
            isEligible: true,
            reason: eligibilityResult.reason,
            refundAmount: refundResult.refundAmount,
            message: refundResult.message
        });

    } catch (error) {
        // Safety Guard: Catch unexpected crashes so the server doesn't die
        return res.status(500).json({
            success: false,
            error: "Internal Server Error in Returns Service: " + error.message
        });
    }
});

// Export this router so the main backend server file can use it
module.exports = router;

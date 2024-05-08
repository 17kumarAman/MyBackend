
import Payslip from "../models/PaySlip/Payslip.js"
import User from "../models/User/User.js";

export const getPayslip = async (req, res) => {
    try {
        const { month, year } = req.body;

        // Find all users
        const allUsers = await User.find({});

        // Array to store user details with payslip status
        let usersWithPayslipStatus = [];

        // Iterate through each user
        for (const user of allUsers) {
            // Find payslip for the user for the given month and year
            const payslip = await Payslip.findOne({
                user: user._id,
                month: month,
                year: year
            });

            // If payslip doesn't exist for the user, consider it unpaid
            if (!payslip) {
                usersWithPayslipStatus.push({
                    user: user,
                    status: "Unpaid"
                });
            } else {
                // Payslip exists, check its status
                usersWithPayslipStatus.push({
                    user: user,
                    status: payslip.status
                });
            }
        }

        // Send the response with users' details and payslip status
        return res.status(200).json({
            status: true,
            message: "Payslip details fetched successfully",
            payslipDetails: usersWithPayslipStatus
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};

export const togglePayslip = async (req, res) => {
    try {
        const { userId } = req.params;
        const { month, year } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        // Check if the user already has a payslip for the given month and year
        let payslip = await Payslip.findOne({
            user: userId,
            month: month,
            year: year
        });

        if (!payslip) {
            // If payslip doesn't exist, create a new one and mark it as paid
            payslip = await Payslip.create({
                user: userId,
                month: month,
                year: year,
                status: "Paid"
            });
        } else {
            // If payslip exists, toggle its status
            payslip.status = payslip.status === "Paid" ? "Unpaid" : "Paid";
            await payslip.save();
        }

        return res.status(200).json({
            status: true,
            message: "Payslip status toggled successfully",
            payslip: payslip
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};
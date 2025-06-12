import TestClock from "../models/TestTimer";

// 🔵 Create
export const createClock = async (req, res) => {
    try {
        const clock = await TestClock.create(req.body);
        res.status(201).json({ status: true, message: "Clock created", data: clock });
    } catch (error) {
        res.status(500).json({ status: false, message: "Create failed", error: error.message });
    }
};

// 🟢 Read all
export const getAllClocks = async (req, res) => {
    try {
        const clocks = await TestClock.find();
        res.status(200).json({ status: true, message: "Fetched successfully", data: clocks });
    } catch (error) {
        res.status(500).json({ status: false, message: "Fetch failed", error: error.message });
    }
};

// 🟡 Read by ID
export const getClockById = async (req, res) => {
    try {
        const clock = await TestClock.findById(req.params.id);
        if (!clock) return res.status(404).json({ status: false, message: "Clock not found" });
        res.status(200).json({ status: true, data: clock });
    } catch (error) {
        res.status(500).json({ status: false, message: "Fetch failed", error: error.message });
    }
};

// 🟠 Update
export const updateClock = async (req, res) => {
    try {
        const updatedClock = await TestClock.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClock) return res.status(404).json({ status: false, message: "Clock not found" });
        res.status(200).json({ status: true, message: "Updated", data: updatedClock });
    } catch (error) {
        res.status(500).json({ status: false, message: "Update failed", error: error.message });
    }
};

// 🔴 Delete
export const deleteClock = async (req, res) => {
    try {
        const deleted = await TestClock.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ status: false, message: "Clock not found" });
        res.status(200).json({ status: true, message: "Deleted" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Delete failed", error: error.message });
    }
};

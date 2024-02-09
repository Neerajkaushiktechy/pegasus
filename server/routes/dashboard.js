const express = require("express");
const router = new express.Router;
const dashboard = require("../controllers/dashboard/dashboard");

router.get("/getDashboard",dashboard.getDashboardData);

module.exports = router;
module.exports = app => {
    app.get("/", (req, res) => {
        res.json({
            message: "Smart home mqtt connection."
        });
    });
};
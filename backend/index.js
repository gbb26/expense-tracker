const { port, app } = require("./express")

app.listen(port || 3000, () => {
    console.log(`server running on ${[port || 3000]}`);
})
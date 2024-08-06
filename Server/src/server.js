const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Welcome haiThanhTran.Server is running on port ${PORT}`);
});

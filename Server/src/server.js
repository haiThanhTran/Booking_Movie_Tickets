const app = require("./app");
import { env } from "./config/enviroment";
const PORT = env.LOCAL_DEV_APP_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Welcome haiThanhTran.Server is running on port ${PORT}`);
});

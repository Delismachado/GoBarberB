import adminJS from "../services/adminJS";
const AdminJSExpress = require('@adminjs/express')

const adminRouter = async function () {
    return AdminJSExpress.buildRouter(await adminJS())
}

export default adminRouter;
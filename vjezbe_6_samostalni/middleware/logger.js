export default function logger(appName) {
  return (req, res, next) => {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0];
    const method = req.method;
    const url = req.originalUrl;

    console.log(`[${appName}] [${date} ${time}] : ${method} ${url}`);
    next();
  };
}

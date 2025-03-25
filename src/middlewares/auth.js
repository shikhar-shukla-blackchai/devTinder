const adminAuth = (req, res, next) => {
  console.log("Admin aith is getting checked!!");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized request!");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("Admin aith is getting checked!!");
  const token = "xyz";
  const isAuthorized = token === "xyzdf";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized request!");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};

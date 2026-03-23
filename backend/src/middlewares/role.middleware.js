const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!["admin", "super_admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
};

const isTenant = (req, res, next) => {
  if (!req.user || req.user.role !== "tenant") {
    return res.status(403).json({ message: "Tenant access only" });
  }
  next();
};

module.exports = isAdmin,isTenant;
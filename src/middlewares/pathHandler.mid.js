const pathHandler = (req, res, next) => {
  res.status(404).json({ error: "Path not found" });
};

export default pathHandler;

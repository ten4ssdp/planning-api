function verifyPermission(req, res, next): void {
  if (req.user.role.id == '4') {
    res.status(401).json({ error: 'Accès refusé.' });
  } else {
    next();
  }
}

export default verifyPermission;

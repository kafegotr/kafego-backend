export const generateUserModel = ({ req }) => ({
  getAll: () => fetch('http://localhost:3000/kaydol', { headers: req.headers }),
});

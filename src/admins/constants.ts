export const jwtConstants = {
  secret: process.env.JWT_SECRET || '$2b$10$fZNMRPq/fZvs3hJoLBQH7OPNAS3sISrBrWsroJPP9Yh26r.ab80qy',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
};

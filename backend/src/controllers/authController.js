import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../config/database.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 查询用户
    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE username = ?',
      args: [username]
    });

    const user = result.rows[0];
    
    // 用户不存在
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: '用户名或密码错误' 
      });
    }

    // 验证密码 (临时使用明文对比，生产环境应该使用 bcrypt)
    const isValidPassword = password === user.password;
    
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false,
        message: '用户名或密码错误' 
      });
    }

    // 生成 JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: '服务器错误' 
    });
  }
};

export const checkAuth = async (req, res) => {
  res.json({ 
    success: true,
    user: req.user 
  });
};

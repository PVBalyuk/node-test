import { Response, Request } from 'express';
import { Customer } from '../database/models/Customer/customer';
import bcryptjs from 'bcryptjs';
import { validationResult } from 'express-validator';
import TokenService from '../services/token-service';
import jwt_decode from 'jwt-decode';
import tokenService from '../services/token-service';

interface IDecodedToken {
  email: string;
  exp: string;
  iat: string;
}

class authController {
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(200).json({ message: 'Ошибки при регистрации', errors });
      }
      const user = await Customer.findOne({ where: { firstName: req.body.firstName } });

      if (user) {
        return res.status(400).json('Пользователь с таким логином уже существует');
      }
      const hashPassword = await bcryptjs.hash(req.body.password, 5);

      await Customer.create({
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        email: req.body.email,
        password: hashPassword,
      });

      return res.status(200).json({ message: 'successful' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const userEmailCheck = await Customer.findOne({ where: { email: req.body.email } });

      if (!userEmailCheck) {
        return res.status(400).json('Пользователя с таким email не существует');
      }
      const { id, firstName, secondName, email } = userEmailCheck.get();
      const validPass = await bcryptjs.compare(req.body.password, userEmailCheck.get().password);

      if (!validPass) {
        return res.status(400).json('Неверный пароль');
      }
      const token = await TokenService.generateTokens({ email });

      await Customer.update({ refreshToken: token.refreshToken }, { where: { email: req.body.email } });
      res.status(200).json(`id${id} ${firstName} ${secondName} ${email} Refresh token - ${token.refreshToken}`);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  }
  async RefreshAccessToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new Error('Unauthorized user');
      }
      const userData = await tokenService.validateRefreshToken(refreshToken);

      if (!userData) {
        return res.status(400).json('Неверный рефреш токен');
      }
      const user = await Customer.findOne({ where: { email: userData.email } });

      if (!user) {
        return res.status(400).json('Нет пользователя');
      }
      const refreshTokenFromDB = user.get().refreshToken;

      if (!refreshTokenFromDB) {
        return res.status(400).json('Нет рефреш токена');
      }
      const decoded: IDecodedToken = jwt_decode(refreshTokenFromDB);

      if (refreshToken !== refreshTokenFromDB) {
        return res.status(400).json('Данные не соответствуют имеющимся в БД');
      }
      const expiresAt = decoded.exp;

      if (!expiresAt) {
        return res.status(400).json('Рефреш токен закончился');
      }
      const email = user.get().email;
      const newTokens = await TokenService.generateTokens({ email });

      await Customer.update({ refreshToken: newTokens.refreshToken }, { where: { email: userData.email } });

      return res.status(200).json(newTokens);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new authController();

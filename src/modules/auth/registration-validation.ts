import { check } from 'express-validator';

export const registrationValidation = [
  check('firstName', 'имя пользователя должно иметь длину от 2 до 64').trim().isLength({
    min: 2,
    max: 64,
  }),
  check('firstName', 'имя пользователя может содержать только латинские символы')
    .trim()
    .matches(/[a-zA-Z]/),
  check('secondName', 'имя пользователя должно иметь длину от 2 до 64').trim().isLength({
    min: 2,
    max: 64,
  }),
  check('secondName', 'имя пользователя может содержать только латинские символы')
    .trim()
    .matches(/[a-zA-Z]/),
  check('email', 'неверный формат email').isEmail(),
  check('password', 'пароль должен содержать от 8 до 64 символов').trim().isLength({
    min: 8,
    max: 64,
  }),
  check('password', 'пароль должен содержать хотя бы 1 заглавную букву').matches(/(?=.*?[A-Z])/),
];

import { UserModel, IUser } from '../user/user.model';
import { loginService } from './login.service';
import { expect, test, beforeAll, } from '@jest/globals';
import bcrypt from 'bcrypt';
import config from '../config';

test('Login with valid email and password combination should return a JWT token', async () => {
    const userToLogin = {
        email: 'johndoe5@test.com',
        password: '12345678',
        name: ''
    };
    jest.replaceProperty(config, 'jwtSecret', 'superjwtsecret');
    jest.spyOn(UserModel, 'findOne').mockResolvedValue(
        {
            name: 'John Doe',
            email: 'johndoe5@test.com',
            password: '$2b$10$3NP3h9YD8DZizp/mXJ4X6O7JpfGn181uogqH9fE4GOUy.YPJx84Pi',
            id: 'random id',
            __v: 0,
        },
    );

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true))

    const result = await loginService.login(userToLogin);

    expect(result.token).toBeTruthy();
});

test('Login with invalid email and password combination should throw an error', async () => {
    const userToLogin = {
        email: 'johndoe5@test.com',
        password: 'wrongpassword',
        name: ''
    };
    jest.spyOn(UserModel, 'findOne').mockResolvedValue(null);

    await expect(loginService.login(userToLogin)).rejects.toThrow();
});



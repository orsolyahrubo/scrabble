import { UserModel, IUser } from '../user/user.model';
import { registerService } from './register.service';
import { expect, test } from '@jest/globals';

test('Register with valid data should return name, email and id', async () => {
    const userToRegister = {
        name: 'John Doe',
        email: 'johndoe1@test.com',
        password: 'password123',
    } as IUser;

    jest.spyOn(UserModel, 'findOne').mockResolvedValue(null);
    jest.spyOn(UserModel, 'create').mockResolvedValue({
        name: 'John Doe',
        email: 'johndoe1@test.com',
        password: 'hashed password',
        id: 'random id',
        __v: 0,
    } as any);

    const result = await registerService.register(userToRegister);

    expect(result.name).toBe('John Doe');
    expect(result.email).toBe('johndoe1@test.com');
    expect(result.id).toBeTruthy();
});

test('Register with taken email should throw an error', async () => {
    const userToRegister = {
        name: 'John Doe',
        email: 'johndoe5@test.com',
        password: 'password123',
    } as IUser;

    jest.spyOn(UserModel, 'findOne').mockResolvedValue(
        {
            name: 'John Doe',
            email: 'johndoe5@test.com',
            password: 'hashed password',
            id: 'random id',
            __v: 0,
        });
    await expect(registerService.register(userToRegister)).rejects.toThrow();
});
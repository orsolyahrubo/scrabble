import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../pages/LoginForm';
import { BrowserRouter } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';

const MockLoginForm = () => {
    return (
        <BrowserRouter>
            <GameContext.Provider>
                <LoginForm />
            </GameContext.Provider>
        </BrowserRouter>
    );
}

describe('Form checks', () => {

    describe(('Initial form state'), () => {
        it('Should render the form', async () => {
            render(
                <MockLoginForm />
            );
            const headingElement = screen.getByRole('heading', { name: /Login/i });
            const emailInputElement = screen.getByPlaceholderText(/Email/i);
            const passwordInputElement = screen.getByPlaceholderText(/Password/i);
            const submitButtonElement = screen.getByRole('button', { name: /Login/i });

            expect(headingElement).toBeInTheDocument();
            expect(emailInputElement).toBeInTheDocument();
            expect(passwordInputElement).toBeInTheDocument();
            expect(submitButtonElement).toBeInTheDocument();
        })
        it('Should be able to type in the email and password fields', async () => {
            render(
                <MockLoginForm />
            );
            const emailInputElement = screen.getByPlaceholderText(/Email/i);
            const passwordInputElement = screen.getByPlaceholderText(/Password/i);

            fireEvent.change(emailInputElement, { target: { value: 'test@test.com' } });
            fireEvent.change(passwordInputElement, { target: { value: 'password123' } });

            expect(emailInputElement.value).toBe('test@test.com');
            expect(passwordInputElement.value).toBe('password123');
        })
        it('Should get an errormessage when submitting an empty form', async () => {
            render(
                <MockLoginForm />
            );
            const submitButtonElement = screen.getByRole('button', { name: /Login/i });

            fireEvent.click(submitButtonElement);

            const errorMessagesCannotBeEmpty = await screen.findAllByText(/Cannot be empty./i);
            const errorMessageMustBeAValidEmail = await screen.findAllByText(/Must be a valid email./i);
            expect(errorMessagesCannotBeEmpty).toHaveLength(2);
            expect(errorMessageMustBeAValidEmail).toHaveLength(1);
        })
    });
    describe('FETCH', () => {
        let fetchSpy;

        beforeEach(() => {
            fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
                json: jest.fn().mockResolvedValue({}),
                ok: true
            })
        });
        afterEach(() => {
            jest.restoreAllMocks();
        });
        it('If fetch is being called', async () => {
            render(
                <MockLoginForm />
            );
            const emailInputElement = screen.getByPlaceholderText(/Email/i);
            const passwordInputElement = screen.getByPlaceholderText(/Password/i);
            const submitButtonElement = screen.getByRole('button', { name: /Login/i });

            fireEvent.change(emailInputElement, { target: { value: 'test@test.com' } });
            fireEvent.change(passwordInputElement, { target: { value: 'password123' } });
            fireEvent.click(submitButtonElement);

            await waitFor(() => {
                expect(fetchSpy).toHaveBeenCalledTimes(1);
            });
        })
        it('If fetch is not being called because email is not valid', async () => {
            render(
                <MockLoginForm />
            );
            const emailInputElement = screen.getByPlaceholderText(/Email/i);
            const passwordInputElement = screen.getByPlaceholderText(/Password/i);
            const submitButtonElement = screen.getByRole('button', { name: /Login/i });

            fireEvent.change(emailInputElement, { target: { value: '' } });
            fireEvent.change(passwordInputElement, { target: { value: 'password123' } });
            fireEvent.click(submitButtonElement);

            await waitFor(() => {
                expect(fetchSpy).not.toHaveBeenCalled();
            });
        })
        it('If fetch is being called with the correct data', async () => {
            render(
                <MockLoginForm />
            );
            const emailInputElement = screen.getByPlaceholderText(/Email/i);
            const passwordInputElement = screen.getByPlaceholderText(/Password/i);
            const submitButtonElement = screen.getByRole('button', { name: /Login/i });

            fireEvent.change(emailInputElement, { target: { value: 'test@test.com' } });
            fireEvent.change(passwordInputElement, { target: { value: 'password123' } });
            fireEvent.click(submitButtonElement);

            await waitFor(() => {
                expect(fetchSpy).toHaveBeenCalledWith(process.env.REACT_APP_API_BASE_URL + '/api/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: 'test@test.com',
                        password: 'password123'
                    }),
                    headers: {
                        'Content-type': 'application/json',
                    },
                });
            });
        })
        it('If response is ok then all my imput fields are empty again', async () => {
            render(
                <MockLoginForm />
            );
            const emailInputElement = screen.getByPlaceholderText(/Email/i);
            const passwordInputElement = screen.getByPlaceholderText(/Password/i);
            const submitButtonElement = screen.getByRole('button', { name: /Login/i });

            fireEvent.change(emailInputElement, { target: { value: 'test@test.com' } });
            fireEvent.change(passwordInputElement, { target: { value: 'password123' } });
            fireEvent.click(submitButtonElement);

            await waitFor(() => {
                expect(emailInputElement.value).toBe('');
                expect(passwordInputElement.value).toBe('');
            });
        })
    })
});
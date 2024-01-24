import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '../pages/RegisterForm';
import { BrowserRouter } from 'react-router-dom';
import GameContextProvider from '../contexts/GameContext';

const MockRegisterForm = () => {
    return (
        <GameContextProvider>
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        </GameContextProvider>
    )
}

describe('Form checks', () => {

    describe('Heading', () => {
        it('Form has a heading', async () => {
            render(
                <MockRegisterForm />
            );
            const headingElement = screen.getByRole(/heading/i);
            expect(headingElement).toBeInTheDocument();
        });
    })

    describe('Name input field', () => {
        it('Name input field exists', async () => {
            render(
                <MockRegisterForm />
            );
            const inputElement = screen.getByPlaceholderText(/Name*/i);
            expect(inputElement).toBeInTheDocument();
        });

        it('Should be able to type in name input', async () => {
            render(
                <MockRegisterForm />
            );
            const inputElement = screen.getByPlaceholderText(/Name*/i);
            fireEvent.change(inputElement, { target: { value: 'John Doe' } })
            expect(inputElement.value).toBe('John Doe');
        });

        it('Should get an error when name input is empty and button is clicked', async () => {
            render(
                <MockRegisterForm />
            );
            const inputElement = screen.getByPlaceholderText(/Name*/i);
            const buttonElement = screen.getByRole('button', { name: /Registration/i });
            fireEvent.change(inputElement, { target: { value: '' } })
            fireEvent.click(buttonElement);
            console.log(inputElement)
            expect(inputElement).toHaveClass('input-field form-control shadow-none is-invalid')
        });

        it('Should get an errormessage when name input is empty, both email and password fields are filled correctly and button is clicked', async () => {
            render(
                <MockRegisterForm />
            );
            const inputElement = screen.getByPlaceholderText(/Name*/i);
            const inputElementEmail = screen.getByPlaceholderText(/Email*/i);
            const inputElementPassword = screen.getByPlaceholderText(/Password*/i);
            const buttonElement = screen.getByRole('button', { name: /Registration/i });
            fireEvent.change(inputElement, { target: { value: '' } })
            fireEvent.change(inputElementEmail, { target: { value: 'example@example.com' } })
            fireEvent.change(inputElementPassword, { target: { value: '12345678' } })
            fireEvent.click(buttonElement);
            const errorMessage = screen.getByText(/Cannot be empty./i)
            expect(errorMessage).toBeInTheDocument()
        });
    })

    describe('Email input field', () => {
        it('Email input field exists', async () => {
            render(
                <MockRegisterForm />
            );
            const inputElement = screen.getByPlaceholderText(/Email*/i);
            expect(inputElement).toBeInTheDocument();
        });

        it('Should be able to type in email input', async () => {
            render(
                <MockRegisterForm />
            );
            const inputElement = screen.getByPlaceholderText(/Email*/i);
            fireEvent.change(inputElement, { target: { value: 'test@test.com' } })
            expect(inputElement.value).toBe('test@test.com');
        });

        it('Should get an error when email input is empty and button is clicked', async () => {
            render(
                <MockRegisterForm />
            );
            const inputElement = screen.getByPlaceholderText(/Email*/i);
            const buttonElement = screen.getByRole('button', { name: /Registration/i });
            fireEvent.change(inputElement, { target: { value: '' } })
            fireEvent.click(buttonElement);
            expect(inputElement).toHaveClass('input-field form-control shadow-none is-invalid')
        });

        it('Should get an errormessage when email input is empty, both name and password fields are filled correctly and button is clicked', async () => {
            render(
                <MockRegisterForm />
            );
            const inputElement = screen.getByPlaceholderText(/Email*/i);
            const inputElementName = screen.getByPlaceholderText(/Name*/i);
            const inputElementPassword = screen.getByPlaceholderText(/Password*/i);
            const buttonElement = screen.getByRole('button', { name: /Registration/i });
            fireEvent.change(inputElement, { target: { value: '' } })
            fireEvent.change(inputElementName, { target: { value: 'John Doe' } })
            fireEvent.change(inputElementPassword, { target: { value: '12345678' } })
            fireEvent.click(buttonElement);
            const errorMessage = screen.getByText(/Cannot be empty./i)
            expect(errorMessage).toBeInTheDocument()
        });
    })

    describe('Password input field', () => {
        it('Password input field exists', async () => {
            render(
                <MockRegisterForm />
            );
            const inputElement = screen.getByPlaceholderText(/Password*/i);
            expect(inputElement).toBeInTheDocument();
        });

        it('Should be able to type in password input', async () => {
            render(
                <MockRegisterForm />
            );
            const inputElement = screen.getByPlaceholderText(/Password*/i);
            fireEvent.change(inputElement, { target: { value: '********' } })
            expect(inputElement.value).toBe('********');
        });

        it('Should get an error when password input is empty and button is clicked', async () => {
            render(
                <MockRegisterForm />
            );
            const inputElement = screen.getByPlaceholderText(/Password*/i);
            const buttonElement = screen.getByRole('button', { name: /Registration/i });
            fireEvent.change(inputElement, { target: { value: '' } })
            fireEvent.click(buttonElement);
            expect(inputElement).toHaveClass('input-field form-control shadow-none is-invalid')
        });

        it('Should get an errormessage when password input has at least 1 but less than 8 characters and button is clicked', async () => {
            render(
                <MockRegisterForm />
            );
            const inputElement = screen.getByPlaceholderText(/Password*/i);
            const buttonElement = screen.getByRole('button', { name: /Registration/i });
            fireEvent.change(inputElement, { target: { value: '*' } })
            fireEvent.click(buttonElement);
            const errorMessage = screen.getByText(/Must be at least 8 characters long./i)
            expect(errorMessage).toBeInTheDocument()
        });
    })

    describe('Checkbox', () => {
        it('Checkbox exists', async () => {
            render(
                <MockRegisterForm />
            );
            const checkboxElement = screen.getByLabelText(/I accept the Terms and Conditions */i);
            expect(checkboxElement).toBeInTheDocument();
        });

        it('Checkbox works if it is not checked', async () => {
            render(
                <MockRegisterForm />
            );
            const checkboxElement = screen.getByLabelText(/I accept the Terms and Conditions */i);
            fireEvent.change(checkboxElement, { target: { checked: false } })
            expect(checkboxElement).not.toBeChecked();
        });

        it('Checkbox works if it is checked', async () => {
            render(
                <MockRegisterForm />
            );
            const checkboxElement = screen.getByLabelText(/I accept the Terms and Conditions */i);
            fireEvent.change(checkboxElement, { target: { checked: true } })
            expect(checkboxElement).toBeChecked();
        });

        it('Should get an error when checkbox is not checked and button is clicked', async () => {
            render(
                <MockRegisterForm />
            );
            const checkboxElement = screen.getByLabelText(/I accept the Terms and Conditions */i);
            const buttonElement = screen.getByRole('button', { name: /Registration/i });

            fireEvent.change(checkboxElement, { checked: false })
            fireEvent.click(buttonElement);
            expect(checkboxElement).toHaveClass('form-check-input is-invalid')
        });

        it('Should get an errormessage when checkbox is not checked and button is clicked', async () => {
            render(
                <MockRegisterForm />
            );
            const checkboxElement = screen.getByLabelText(/I accept the Terms and Conditions */i);
            const buttonElement = screen.getByRole('button', { name: /Registration/i });
            fireEvent.change(checkboxElement, { checked: false })
            fireEvent.click(buttonElement);
            const errorMessage = screen.getByText(/Must be checked./i)
            expect(errorMessage).toBeInTheDocument()
        });
    })

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
        it('If fetching was called', async () => {

            render(<MockRegisterForm />)

            const buttonElement = screen.getByRole('button', { name: /Registration/i });
            const nameInputElement = screen.getByPlaceholderText(/Name*/i);
            const emailInputElement = screen.getByPlaceholderText(/Email*/i);
            const passwordInputElement = screen.getByPlaceholderText(/Password*/i);
            const checkboxElement = screen.getByLabelText(/I accept the Terms and Conditions */i);

            fireEvent.change(nameInputElement, { target: { value: 'John Doe' } })
            fireEvent.change(emailInputElement, { target: { value: 'test@test.com' } })
            fireEvent.change(passwordInputElement, { target: { value: 'abcdefgh' } })
            fireEvent.click(checkboxElement, { checked: true })
            fireEvent.click(buttonElement);

            expect(fetchSpy).toHaveBeenCalled();
        })
        it('If fetching was not called', async () => {

            render(<MockRegisterForm />)

            const buttonElement = screen.getByRole('button', { name: /Registration/i });
            const nameInputElement = screen.getByPlaceholderText(/Name*/i);
            const emailInputElement = screen.getByPlaceholderText(/Email*/i);
            const passwordInputElement = screen.getByPlaceholderText(/Password*/i);
            const checkboxElement = screen.getByLabelText(/I accept the Terms and Conditions */i);

            fireEvent.change(nameInputElement, { target: { value: '' } })
            fireEvent.change(emailInputElement, { target: { value: 'test@test.com' } })
            fireEvent.change(passwordInputElement, { target: { value: 'abcdefgh' } })
            fireEvent.click(checkboxElement, { checked: true })
            fireEvent.click(buttonElement);

            expect(fetchSpy).not.toHaveBeenCalled();
        })
        it('If fetching was called with the right params', async () => {

            render(<MockRegisterForm />)

            const buttonElement = screen.getByRole('button', { name: /Registration/i });
            const nameInputElement = screen.getByPlaceholderText(/Name*/i);
            const emailInputElement = screen.getByPlaceholderText(/Email*/i);
            const passwordInputElement = screen.getByPlaceholderText(/Password*/i);
            const checkboxElement = screen.getByLabelText(/I accept the Terms and Conditions */i);

            fireEvent.change(nameInputElement, { target: { value: 'John Doe' } })
            fireEvent.change(emailInputElement, { target: { value: 'test@test.com' } })
            fireEvent.change(passwordInputElement, { target: { value: 'abcdefgh' } })
            fireEvent.click(checkboxElement, { checked: true })
            fireEvent.click(buttonElement);

            expect(fetchSpy).toHaveBeenCalledWith(process.env.REACT_APP_API_BASE_URL + '/api/register', {
                method: 'POST',
                body: JSON.stringify({
                    name: "John Doe",
                    email: "test@test.com",
                    password: "abcdefgh"
                }),
                headers: {
                    'Content-type': 'application/json'
                }

            });
        })
        it('Response.ok than my input fields are empty after button clicked', async () => {

            render(<MockRegisterForm />)

            const buttonElement = screen.getByRole('button', { name: /Registration/i });
            const nameInputElement = screen.getByPlaceholderText(/Name*/i);
            const emailInputElement = screen.getByPlaceholderText(/Email*/i);
            const passwordInputElement = screen.getByPlaceholderText(/Password*/i);
            const checkboxElement = screen.getByLabelText(/I accept the Terms and Conditions */i);

            fireEvent.change(nameInputElement, { target: { value: 'John' } })
            fireEvent.change(emailInputElement, { target: { value: 'test@test.com' } })
            fireEvent.change(passwordInputElement, { target: { value: '*********' } })
            fireEvent.click(checkboxElement, { checked: true })
            fireEvent.click(buttonElement);
            await waitFor(() => {
                expect(nameInputElement.value).toBe('');
                expect(emailInputElement.value).toBe('');
                expect(passwordInputElement.value).toBe('');
                expect(checkboxElement).not.toBeChecked();
            });
        })
    })

})
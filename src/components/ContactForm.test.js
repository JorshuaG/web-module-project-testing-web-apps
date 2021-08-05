import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const headerRender = screen.queryByText(/Contact Form/);
  expect(headerRender).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name*/i);
  userEvent.type(firstNameInput, "Josh");
  const firstnameError = screen.getByText(
    /firstName must have at least 5 characters./i
  );
  expect(firstnameError).toBeInTheDocument();
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  const inputErrors = screen.getAllByTestId(/error/);

  expect(inputErrors[0]).toHaveTextContent(
    "firstName must have at least 5 characters."
  );
  expect(inputErrors[2]).toHaveTextContent(
    "email must be a valid email address."
  );
  expect(inputErrors[1]).toHaveTextContent("lastName is a required field.");
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name*/i);
  userEvent.type(firstNameInput, "Joshua");

  const lastNameInput = screen.getByLabelText(/last name*/i);
  userEvent.type(lastNameInput, "Gearheart");

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  const inputErrors = screen.getAllByTestId(/error/);

  expect(inputErrors[0]).toHaveTextContent(
    "email must be a valid email address."
  );
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);

  const emailInput = screen.getByLabelText(/email*/i);
  userEvent.type(emailInput, "josh");

  const inputErrors = screen.getAllByTestId(/error/);

  expect(inputErrors[0]).toHaveTextContent(
    "email must be a valid email address."
  );
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name*/i);
  userEvent.type(firstNameInput, "Joshua");

  const emailInput = screen.getByLabelText(/email*/i);
  userEvent.type(emailInput, "josh@josh.com");

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  const inputErrors = screen.getAllByTestId(/error/);

  expect(inputErrors[0]).toHaveTextContent("lastName is a required field.");
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);

  const emailInput = screen.getByLabelText(/email*/i);
  userEvent.type(emailInput, "josh");

  const inputErrors = screen.getAllByTestId(/error/);

  expect(inputErrors[0]).toHaveTextContent(
    "email must be a valid email address."
  );
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name*/i);
  userEvent.type(firstNameInput, "Joshua");

  const lastNameInput = screen.getByLabelText(/last name*/i);
  userEvent.type(lastNameInput, "Gearheart");

  const emailInput = screen.getByLabelText(/email*/i);
  userEvent.type(emailInput, "josh@josh.com");

  const messageInput = screen.getByLabelText(/message/i);
  userEvent.type(messageInput, "");

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  const submissionCard = screen.queryByText(/you submitted:/i);
  expect(submissionCard).toBeInTheDocument();

  const messageRender = screen.queryByTestId(/messageDisplay/);
  expect(messageRender).not.toBeInTheDocument();

  const fNameRender = screen.queryByTestId(/firstnameDisplay/);
  expect(fNameRender).toBeInTheDocument();

  const lNameRender = screen.queryByTestId(/lastnameDisplay/);
  expect(lNameRender).toBeInTheDocument();

  const emailRender = screen.queryByTestId(/emailDisplay/);
  expect(emailRender).toBeInTheDocument();
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name*/i);
  userEvent.type(firstNameInput, "Joshua");

  const lastNameInput = screen.getByLabelText(/last name*/i);
  userEvent.type(lastNameInput, "Gearheart");

  const emailInput = screen.getByLabelText(/email*/i);
  userEvent.type(emailInput, "josh@josh.com");

  const messageInput = screen.getByLabelText(/message/i);
  userEvent.type(messageInput, "Covid can kick rocks");

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  const submissionCard = screen.queryByText(/you submitted:/i);
  expect(submissionCard).toBeInTheDocument();

  const messageRender = screen.queryByTestId(/messageDisplay/);
  expect(messageRender).toBeInTheDocument();

  const fNameRender = screen.queryByTestId(/firstnameDisplay/);
  expect(fNameRender).toBeInTheDocument();

  const lNameRender = screen.queryByTestId(/lastnameDisplay/);
  expect(lNameRender).toBeInTheDocument();

  const emailRender = screen.queryByTestId(/emailDisplay/);
  expect(emailRender).toBeInTheDocument();
});

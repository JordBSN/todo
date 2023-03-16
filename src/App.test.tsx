import { describe, test, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  let todoListInput: HTMLElement;
  beforeEach(async () => {
    render(<App />);
    const addTodoButton = screen.getByRole('button', { name: /Ajouter une todo/i });
    fireEvent.click(addTodoButton);
    todoListInput = screen.getByPlaceholderText(/Renseignez votre chose à faire/i);
  });

  test('handleAddTodo() should add a todo when click on add button', () => {
    expect(todoListInput).toBeInTheDocument();
  });

  beforeEach(async () => {
    fireEvent.change(todoListInput, { target: { value: 'test' } });
  });

  test('handleChangeInput() should change content in todo', () => {
    expect(todoListInput).toHaveValue('test');
  });

  test('handleClickValidateTodo() should validate todo when click on validate button', () => {
    const validateButton = screen.getByTestId('validateButton');
    fireEvent.click(validateButton);
    expect(todoListInput).toHaveValue('test');
    expect(todoListInput).not.toBeInTheDocument();
  });

  test('handleClickEditTodo() should edit todo when click on edit button', () => {
    const validateButton = screen.getByTestId('validateButton');
    fireEvent.click(validateButton);
    const editButton = screen.getByTestId('editButton');
    fireEvent.click(editButton);
    todoListInput = screen.getByPlaceholderText(/Renseignez votre chose à faire/i);
    expect(todoListInput).toBeInTheDocument();
  });

  test('handleClickValidateTodo() should stash editButton', () => {
    const validateButton = screen.getByTestId('validateButton');
    fireEvent.click(validateButton);
    const editButton = screen.getByTestId('editButton');
    expect(editButton).toBeInTheDocument();
  });

  test('handleClickEditTodo() should stash validateButton', () => {
    const validateButton = screen.getByTestId('validateButton');
    fireEvent.click(validateButton);
    const editButton = screen.getByTestId('editButton');
    fireEvent.click(editButton);
    expect(validateButton).toBeInTheDocument();
  });

  test('handleClickDoneTodo() should check checkbox when click on checkbox', () => {
    const checkbox = screen.getByTestId('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('handleCLickDeleteTodo() should delete todo when click on delete button', () => {
    const deleteButton = screen.getByTestId('deleteButton');
    fireEvent.click(deleteButton);
    expect(todoListInput).not.toBeInTheDocument();
  });
});

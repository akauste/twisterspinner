/* eslint-disable testing-library/no-container */
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Spinner from "./Spinner";

describe('<Spinner />', () => {

  test('has the header text', () => {
    render(<Spinner />);
    const header = screen.getByText(/Pyöritä automaattisesti/i);
    expect(header).toBeVisible();
  });
  
  test('pyöritä button changes the value', () => {
    const { container } = render(<Spinner />);

    // eslint-disable-next-line testing-library/no-node-access
    const resElem = container.querySelector('#result');
    const initValue = resElem.innerHTML;
    
    const spinButton = screen.getByText("Pyöritä");
    userEvent.click(spinButton);

    expect(resElem.innerHTML).not.toEqual(initValue);
  })
});

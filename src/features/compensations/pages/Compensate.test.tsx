import { act, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';

import { minimalRender, screen } from '@/test/test-utils';

import { CompensateForm } from '../components/CompensateForm';

test('renders the compensate form', async () => {
  await minimalRender(<CompensateForm defaultAddress="0x123123123123123123" />);

  const titleElement = await screen.getByRole('heading', { level: 2 });
  expect(titleElement).toHaveTextContent('Select amount to compensate');
});

const goToNextStep = async (title: string) => {
  await act(() => {
    fireEvent.click(screen.getByText(title));
  });
};

test('completes the compensation form flow', async () => {
  const { history } = await minimalRender(<CompensateForm defaultAddress="0x123123123123123123" />);

  const input = screen.getByLabelText('Quantity');
  await act(() => {
    fireEvent.change(input, { target: { value: '23' } });
  });

  await goToNextStep('Compensate');

  const conditionsTitle = await screen.getByRole('heading', { level: 2 });
  expect(conditionsTitle).toHaveTextContent('Accept conditions');
  await act(async () => {
    await goToNextStep('Continue');
  });
  // need to async url update
  await waitForElementToBeRemoved(screen.queryByText(/loading/i)).catch((err) => null);
  expect(history.location.pathname).toBe('/coins/compensate/123123123');
});

test('handles the error of the calculate endpoint', async () => {
  await minimalRender(<CompensateForm defaultAddress="0x123123123123123123" />);

  await goToNextStep('Compensate');

  const titleElement = await screen.getByRole('heading', { level: 2 });
  expect(titleElement).toHaveTextContent('Select amount to compensate');
});

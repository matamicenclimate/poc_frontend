import { render as rtlRender, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FunctionComponent } from 'react';

import { DefaultRender, MockAuthRender } from './renderers';

export const waitForLoadingToFinish = async () => {
  console.log('waiting for laod to finish');

  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByTestId(/loading/i),
      ...screen.queryAllByText(/loading/i),
      ...screen.queryAllByTestId(/loading/i),
    ],
    { timeout: 4000 }
  );
};

export const render = async (
  ui: any,
  { route = '/', ...renderOptions }: Record<string, any> = {}
) => {
  window.history.pushState({}, 'Test page', route);

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: DefaultRender as FunctionComponent<unknown>,
      ...renderOptions,
    }),
  };

  await waitForLoadingToFinish();

  return returnValue;
};

export const minimalRender = async (
  ui: any,
  { route = '/', ...renderOptions }: Record<string, any> = {}
) => {
  window.history.pushState({}, 'Test page', route);

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: MockAuthRender as FunctionComponent<unknown>,
      ...renderOptions,
    }),
  };

  return returnValue;
};

export * from '@testing-library/react';
export { userEvent, rtlRender };

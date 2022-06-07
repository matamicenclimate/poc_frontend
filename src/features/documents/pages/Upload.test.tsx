import { act, fireEvent } from '@testing-library/react';

import { minimalRender, screen } from '@/test/test-utils';

import { UploadForm } from '../components/UploadForm';

test('renders the upload form', async () => {
  await minimalRender(<UploadForm email="test@deka.com" />);

  const titleElement = await screen.getByRole('heading', { level: 2 });
  expect(titleElement).toHaveTextContent('Project info');
});

test('switches between steps', async () => {
  await minimalRender(<UploadForm email="test@deka.com" />);

  const goToNextStep = async (title: string) => {
    await act(() => {
      fireEvent.click(screen.getByText(/continue/i));
    });
    const titleElement = await screen.getByRole('heading', { level: 2 });
    expect(titleElement).toHaveTextContent(title);
  };
  await goToNextStep('Project details');
  await goToNextStep('Configuration');
  await goToNextStep('Upload files');
  await goToNextStep('Confirmation');
});

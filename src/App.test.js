import { render, screen } from '@testing-library/react';
import AnimalsList from './components/AnimalsList/AnimalsListComponent';

test('renders button start game', async () => {
  render(<AnimalsList />);
  const startButton = screen.getByText(/START GAME/i);
  const imgs = await screen.findAllByRole('img');
  expect(startButton).toBeInTheDocument();
  expect(imgs).toHaveLength(9);
});

// test('suppression button start game when clicked', () => {
//   render(<AnimalsList />);
//   const startButton = screen.getByText(/START GAME/i);
//   startButton.click();

//   expect(startButton).toBeNull();
// });

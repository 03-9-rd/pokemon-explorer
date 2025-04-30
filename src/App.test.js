//import { render, screen } from '@testing-library/react';
//import App from './App';

//test('renders learn react link', () => {
  //render(<App />);
  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
//});
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders Pokémon cards', async () => {
  // Render the App component
  render(<App />);
  
  // Wait for the Pokémon list to load (wait for the loading state to finish)
  await waitFor(() => screen.getByText(/bulbasaur/i));

  // Check if a specific Pokémon card (e.g., Bulbasaur) is rendered
  const bulbasaur = screen.getByText(/bulbasaur/i);
  expect(bulbasaur).toBeInTheDocument();
});

test('search functionality filters Pokémon by name', async () => {
  render(<App />);
  
  // Wait for the list to load
  await waitFor(() => screen.getByText(/bulbasaur/i));
  
  // Search for "Charmander"
  const searchInput = screen.getByPlaceholderText('Search Pokémon');
  fireEvent.change(searchInput, { target: { value: 'charmander' } });
  
  // Ensure only Charmander appears in the list
  const charmander = screen.getByText(/charmander/i);
  expect(charmander).toBeInTheDocument();
  
  // Check that no other Pokémon is displayed
  const bulbasaur = screen.queryByText(/bulbasaur/i);
  expect(bulbasaur).not.toBeInTheDocument();
});

test('displays loading state when data is being fetched', () => {
  render(<App />);
  
  // Check for the "loading" text or spinner
  const loadingText = screen.getByText(/loading/i);
  expect(loadingText).toBeInTheDocument();
});

test('shows error state when API fails', async () => {
  // Mock the fetch request to simulate an error
  global.fetch = jest.fn(() =>
    Promise.reject("API failed")
  );
  
  render(<App />);
  
  // Check if the error message is displayed
  const errorText = await screen.findByText(/failed to load/i);
  expect(errorText).toBeInTheDocument();
});

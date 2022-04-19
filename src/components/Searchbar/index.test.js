import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Searchbar from './index';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

const setup = () =>
  render(
    <Provider store={store}>
      <Searchbar />
    </Provider>
  );

describe('Search components should be render', () => {
  beforeEach(setup);
  afterEach(cleanup);

  it('Success render Search component', () => {
    expect(screen.getByLabelText('search-input')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Refresh')).toBeInTheDocument();
  });

  it('Search input value should be same as user typing', () => {
    const searchInput = screen.getByLabelText('search-input');
    userEvent.type(searchInput, 'hello');

    expect(searchInput.value).toBe('hello');
  });
});

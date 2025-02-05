fetchMock.enableMocks();

describe('UserProfile Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders loading', () => {
    render(<UserProfile userId={1} />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders user data when API call is successful', async () => {
    fetch.mockResponseOnce(JSON.stringify({ name: 'John Doe', email: 'john@example.com' }));
    
    render(<UserProfile userId={1} />);
    
    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
  });

  it('renders error message when API call fails', async () => {
    fetch.mockReject(new Error('Failed to fetch user data'));
    
    render(<UserProfile userId={1} />);
    
    await waitFor(() => expect(screen.getByText(/Error: Failed to fetch user data/i)).toBeInTheDocument());
  });
});

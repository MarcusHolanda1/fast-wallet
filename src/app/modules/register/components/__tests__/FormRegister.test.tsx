import { render } from '@testing-library/react-native';

import FormRegisterCard from '../FormRegisterCard';

describe('TestValue', () => {
  it('should render correctly', () => {
    const { getByText } = render(<FormRegisterCard />);
    expect(getByText('Wallet Test')).toBeTruthy();
  });
});

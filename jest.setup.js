// import '@testing-library/react-native'; // Removed problematic import

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  Stack: {
    Screen: jest.fn(({ options }) => null),
  },
}));

jest.mock('expo-constants', () => ({
  expoConfig: {
    name: 'nokta',
    slug: 'nokta',
  },
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
}));

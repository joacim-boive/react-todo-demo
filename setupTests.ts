import { jest } from "@jest/globals";
import "@testing-library/jest-dom";

/* import { server } from "./src/mocks/server"; */
/* beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close()); */
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false, // or true if you want to simulate a match
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

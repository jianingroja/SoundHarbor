import { beforeEach } from 'node:test';
import { generateSpotifyHeader } from '../../../src/lib/services/spotifyServices.ts';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('generateSpotifyHeader', () => {
  it('should generate the correct authorization header', () => {
    const accessToken = 'testAccessToken';
    const expectedHeader = {
      Authorization: 'Bearer testAccessToken',
    };

    expect(generateSpotifyHeader(accessToken)).toEqual(expectedHeader);
  });
});

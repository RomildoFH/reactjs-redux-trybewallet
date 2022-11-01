const mockData = require('./mockData');

const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(mockData),
});

export default mockFetch;

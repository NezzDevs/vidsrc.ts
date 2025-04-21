import express from 'express';
import tmdbScrape from './vidsrc.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'VidSrc API is running' });
});

app.get('/movie/:tmdbId', async (req, res) => {
  try {
    const { tmdbId } = req.params;
    const result = await tmdbScrape(tmdbId, 'movie');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get('/tv/:tmdbId/:season/:episode', async (req, res) => {
  try {
    const { tmdbId, season, episode } = req.params;
    const result = await tmdbScrape(tmdbId, 'tv', parseInt(season), parseInt(episode));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

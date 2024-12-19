import express from "express";
import { YoutubeTranscript } from "youtube-transcript";

const app = express();

app.get("/transcript", async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);

    if (!transcript || transcript.length === 0) {
      return res.status(404).json({ error: "Transcript not found" });
    }

    return res.status(200).json({ transcript });
  } catch (error) {
    console.error("Error fetching transcript:", error.message);
    return res.status(500).json({ error: "Failed to fetch transcript" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

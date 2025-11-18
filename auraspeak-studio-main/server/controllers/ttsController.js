import say from 'say';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import TTSHistory from '../models/TTSHistory.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const convertTextToSpeech = async (req, res) => {
  try {
    const { text, voice = 'alloy' } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (text.length > 5000) {
      return res.status(400).json({ error: 'Text too long. Maximum 5000 characters allowed.' });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `tts_${timestamp}.mp3`;
    const filepath = path.join(__dirname, '../uploads', filename);

    // Use Node.js say package for TTS
    say.export(text, null, 1.0, filepath, (err) => {
      if (err) {
        console.error('TTS Error:', err);
        return res.status(500).json({ error: 'Text-to-speech conversion failed' });
      }

      // Save to database
      const ttsRecord = new TTSHistory({
        text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
        voice,
        audioUrl: `/uploads/${filename}`,
        audioFilename: filename,
        userId: req.user?.id || null
      });

      ttsRecord.save()
        .then(() => {
          res.json({
            success: true,
            audioUrl: `/uploads/${filename}`,
            id: ttsRecord._id
          });
        })
        .catch((dbError) => {
          console.error('Database error:', dbError);
          res.status(500).json({ error: 'Failed to save to database' });
        });
    });

  } catch (error) {
    console.error('TTS Controller Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await TTSHistory.find(req.user?.id ? { userId: req.user.id } : {})
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(history);
  } catch (error) {
    console.error('Get History Error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

export const deleteHistoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await TTSHistory.findById(id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Delete audio file
    const filepath = path.join(__dirname, '../uploads', item.audioFilename);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    // Delete from database
    await TTSHistory.findByIdAndDelete(id);

    res.json({ success: true });
  } catch (error) {
    console.error('Delete History Error:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};
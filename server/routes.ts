import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Fetch Roblox games from user profiles
  app.get("/api/roblox-games", async (req, res) => {
    try {
      const userIds = [1462440075, 3670508462];
      const allGames: any[] = [];

      for (const userId of userIds) {
        try {
          // Fetch user's games from Roblox API
          const response = await fetch(
            `https://games.roblox.com/v2/users/${userId}/games?accessFilter=Public&limit=50&sortOrder=Desc`
          );
          
          if (!response.ok) {
            console.warn(`Failed to fetch games for user ${userId}: ${response.statusText}`);
            continue;
          }

          const data = await response.json();
          
          if (data.data && Array.isArray(data.data)) {
            // Transform the data to match our interface
            const games = data.data.map((game: any) => ({
              id: game.id,
              name: game.name,
              description: game.description,
              placeVisits: game.placeVisits || 0,
              maxPlayers: game.maxPlayers || 0,
              playing: game.playing || 0,
              favoritedCount: game.favoritedCount || 0,
              created: game.created,
              updated: game.updated,
              type: 'roblox',
              universeId: game.universeId,
              rootPlaceId: game.rootPlaceId
            }));
            
            allGames.push(...games);
          }
        } catch (error) {
          console.warn(`Error fetching games for user ${userId}:`, error);
        }
      }

      res.json({ games: allGames });
    } catch (error) {
      console.error('Error fetching Roblox games:', error);
      res.status(500).json({ error: 'Failed to fetch Roblox games' });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // For now, just log the message (you can integrate with SendGrid later)
      console.log('Contact form submission:', { name, email, message });
      
      // Simulate email sending success
      res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

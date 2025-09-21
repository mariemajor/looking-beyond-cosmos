// Get personalized guidance based on soul number and dreams
export function getPersonalizedGuidance(soulNumber: number, dreams: string) {
  const crystals = [
    { name: "Amethyst", emoji: "💜", properties: "spiritual awakening and intuition" },
    { name: "Rose Quartz", emoji: "💗", properties: "self-love and heart healing" },
    { name: "Clear Quartz", emoji: "🤍", properties: "amplification and clarity" },
    { name: "Citrine", emoji: "💛", properties: "abundance and manifestation" },
    { name: "Black Tourmaline", emoji: "🖤", properties: "protection and grounding" },
    { name: "Labradorite", emoji: "💙", properties: "transformation and magic" },
    { name: "Selenite", emoji: "🤍", properties: "purification and connection" },
    { name: "Aventurine", emoji: "💚", properties: "luck and opportunity" },
    { name: "Moonstone", emoji: "🌙", properties: "intuition and divine feminine" }
  ];

  const themes = [
    "Divine Love", "Sacred Healing", "Spiritual Awakening", "Creative Expression", 
    "Inner Wisdom", "Soul Purpose", "Heart Opening", "Transformation", "Abundance"
  ];

  const messages = [
    "Your guides are sending you signs through synchronicities today.",
    "A powerful healing frequency is available to you right now.",
    "Your manifestation abilities are heightened at this time.",
    "Trust the path that's unfolding before you with perfect timing.",
    "Your soul family is supporting your journey from the spiritual realm.",
    "An important lesson is completing itself in your consciousness.",
    "New opportunities are aligning with your highest good.",
    "Your inner child is ready to play and create joyfully.",
    "Divine protection surrounds you as you step into your power."
  ];

  const crystal = crystals[soulNumber % crystals.length];
  const theme = themes[soulNumber % themes.length];
  const message = messages[soulNumber % messages.length];

  return { crystal, theme, message };
}
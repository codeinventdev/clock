export type StopFunction = () => void;

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getCandidatePaths(name: string): string[] {
  const slug = slugifyName(name);
  return [
    `/sounds/${slug}.mp3`,
    `/sounds/${slug}.wav`,
    `/sounds/${slug}.ogg`,
  ];
}

/**
 * Try to play a locally hosted audio file under /public/sounds first.
 * If no file is available or playback fails, falls back to synthesized WebAudio tones.
 */
export async function playNamedSound(name: string, options?: { loop?: boolean }): Promise<StopFunction> {
  const loop = Boolean(options?.loop);

  // Prefer file if present
  const candidates = getCandidatePaths(name);
  for (const url of candidates) {
    try {
      // Probe existence via HEAD
      const res = await fetch(url, { method: 'HEAD' });
      if (!res.ok) continue;

      const audio = new Audio();
      audio.loop = loop;
      audio.src = url;
      await audio.play();
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    } catch {
      // try next
    }
  }

  // Fallback to synthesized WebAudio
  const { SoundPlayer } = await import('./sound-player');
  return SoundPlayer.play(name, { loop });
}




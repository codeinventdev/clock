// Lightweight Web Audio sound generator used for alarms and timers.
// No external APIs or assets required.

type StopFn = () => void;

class SoundPlayerImpl {
  private audioContext: AudioContext | null = null;

  private ensureContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  private createOscillator(
    ctx: AudioContext,
    frequency: number,
    type: OscillatorType = 'sine',
    duration = 0.2,
    gainValue = 0.2,
    attack = 0.01,
    release = 0.05
  ) {
    const oscillator = ctx.createOscillator();
    oscillator.type = type;
    oscillator.frequency.value = frequency;

    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(gainValue, ctx.currentTime + attack);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + Math.max(attack, duration - release));

    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);

    return { oscillator, gain };
  }

  private playBeepPattern(ctx: AudioContext): number {
    // Short triple beep: 1000Hz
    const unit = 0.15;
    for (let i = 0; i < 3; i++) {
      const delay = i * (unit + 0.08);
      this.createOscillator(ctx, 1000, 'sine', unit).oscillator;
      // Slight stagger by using timeouts to start additional beeps
      setTimeout(() => this.createOscillator(ctx, 1000, 'sine', unit), delay * 1000);
    }
    return 3 * (unit + 0.08);
  }

  private playAlarmPattern(ctx: AudioContext): number {
    // Alternating 800Hz and 1200Hz beeps
    const seg = 0.25;
    const pairs = 3;
    for (let i = 0; i < pairs; i++) {
      const t = i * seg * 2;
      setTimeout(() => this.createOscillator(ctx, 800, 'sine', seg), t * 1000);
      setTimeout(() => this.createOscillator(ctx, 1200, 'sine', seg), (t + seg) * 1000);
    }
    return pairs * seg * 2;
  }

  private playBuzzerPattern(ctx: AudioContext): number {
    // Low square buzz
    this.createOscillator(ctx, 120, 'square', 0.7, 0.15, 0.01, 0.2);
    return 0.8;
  }

  private playChimePattern(ctx: AudioContext): number {
    // Two descending tones with decay
    this.createOscillator(ctx, 880, 'sine', 0.25, 0.2, 0.005, 0.1);
    setTimeout(() => this.createOscillator(ctx, 660, 'sine', 0.35, 0.18, 0.005, 0.15), 180);
    return 0.6;
  }

  private getPattern(sound: string): (ctx: AudioContext) => number {
    const key = sound.toLowerCase();
    if (key.includes('buzzer')) return this.playBuzzerPattern.bind(this);
    if (key.includes('alarm')) return this.playAlarmPattern.bind(this);
    if (key.includes('chime')) return this.playChimePattern.bind(this);
    if (key.includes('bell')) return this.playChimePattern.bind(this);
    if (key.includes('beep')) return this.playBeepPattern.bind(this);
    // Fallback
    return this.playBeepPattern.bind(this);
  }

  play(sound: string, options?: { loop?: boolean }): StopFn {
    const ctx = this.ensureContext();
    const pattern = this.getPattern(sound);

    let stopped = false;
    let loopTimer: number | null = null;

    const run = () => {
      if (stopped) return;
      const dur = pattern(ctx);
      if (options?.loop && !stopped) {
        loopTimer = window.setTimeout(run, Math.max(100, dur * 1000));
      }
    };

    run();

    const stop = () => {
      stopped = true;
      if (loopTimer) {
        clearTimeout(loopTimer);
        loopTimer = null;
      }
      // Graceful stop; existing oscillators are short-lived due to pattern envelopes.
    };

    return stop;
  }
}

export const SoundPlayer = new SoundPlayerImpl();




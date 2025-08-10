// Deprecated: TTS flow removed. This file remains for compatibility.
export type AlarmSoundInput = { text: string };
export type AlarmSoundOutput = { media?: string };
export async function getAlarmSound(): Promise<AlarmSoundOutput> {
  return { media: undefined };
}

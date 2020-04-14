export interface Game {
  userText: string,
  phrase: string,
  wrongText: boolean,
  victory: boolean,
  startTime: number | null,
  endTime: number | null,
}
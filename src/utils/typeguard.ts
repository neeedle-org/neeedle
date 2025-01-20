export type Falsy = null | undefined | false | 0 | '' | 0n

export const noFalsy = <T>(value: T | Falsy): value is T => !!value

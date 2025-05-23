export type DeskEndpoints = {
  all: () => string;
  create: () => string;
  one: (deskId: string) => string;
  update: (deskId: string) => string;
  delete: (deskId: string) => string;
};

export type ButtonType = "blue" | "red" | "green" | "primary" | "secondary";

export type CardEndpoints = {
  all: (deskId: string) => string;
  create: () => string;
  one: (cardId: string) => string;
  update: (cardId: string) => string;
  delete: (cardId: string) => string;
};

export type UserEndpoints = {
  check: () => string;
};

export type ApiEndpoints = {
  user: UserEndpoints;
  desk: DeskEndpoints;
  card: CardEndpoints;
};

export type Desk = {
  id: string;
  title: string;
  description: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Card = {
  deskId: string;
  question: string;
  answer: string;
  id: string;
  hint: string | null;
  userId: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

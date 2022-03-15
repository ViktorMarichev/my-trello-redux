export type Column = {
  id: string;
  title: string;
};

export type Card = {
  id: string;
  columnId: string;
  title: string;
  description: '';
  author: string;
};

export type Comment = {
  id: string;
  cardId: string;
  message: string;
  date: Date;
  user: string;
};
export type User = {
  username: string;
};
export type currentCard = {
  cardId: null | string,
  columnId: null | string,
};

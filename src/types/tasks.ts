export type Column = {
  id: string;
  title: string;
  cards: Array<string>;
};

export type Card = {
  id: string;
  title: string;
  description: '';
  author: string;
  comments: Array<string>;
};

export type Comment = {
  id: string;
  title: string;
  date: Date;
  user: string;
};
export type User = {
  username: string;
};

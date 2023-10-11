// a separate type because the user might need to send data to the server but not needed to be stored in the database
export type CreateTodoParams = {
  title: string;
  // done: boolean;
};

export type UpdateTodoParams = {
  title: string;
  done: boolean;
};

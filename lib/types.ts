export type registrationFormData = {
  username: string;
  password: string;
  salt?: string;
};

export type users = {
  id: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
};

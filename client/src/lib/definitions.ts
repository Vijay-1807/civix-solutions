export type Project = {
  _id: string;
  name: string;
  description: string;
  image: string;
  createdAt: Date;
};

export type Client = {
  _id: string;
  name: string;
  description:string;
  designation: string;
  image: string;
  createdAt: Date;
};

export type Contact = {
  _id: string;
  fullname: string;
  email: string;
  mobile: string;
  city: string;
  createdAt: Date;
};

export type Subscriber = {
  _id: string;
  email: string;
  createdAt: Date;
};

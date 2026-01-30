import mongoose, { Document, Schema } from 'mongoose';

// Project Model
export interface IProject extends Document {
  name: string;
  description: string;
  image: string;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

// Client Model
export interface IClient extends Document {
  name: string;
  description: string;
  designation: string;
  image: string;
}

const ClientSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  designation: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

export const Client = mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);

// Contact Model
export interface IContact extends Document {
  fullname: string;
  email: string;
  mobile: string;
  city: string;
}

const ContactSchema: Schema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  city: { type: String, required: true },
}, { timestamps: true });

export const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

// Subscriber Model
export interface ISubscriber extends Document {
  email: string;
}

const SubscriberSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

export const Subscriber = mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);

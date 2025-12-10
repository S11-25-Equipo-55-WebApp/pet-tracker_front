
export type InputType = 'text' | 'email' | 'password' | 'number' | string;
export type InputName = 'name' | 'fullName' | 'email' | 'password' | 'newPassword' | string;
export type InputStyle = 'primary' | 'secondary' | 'danger' | string;
export type InputAction = 'login' | 'register' | 'reset' | string;

export interface DynamicInput {
  name: InputName;
  label: string;
  type: InputType;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
}

export interface DynamicButton {
  label: string;
  type: 'submit' | 'button';
  style?: InputStyle;
  action: InputAction;
}

export interface AuthFormConfig {
  title: string;
  inputs: DynamicInput[];
  buttons: DynamicButton[];
}

export interface User {
  usuarioId: number;
  userName: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  usuario:  User;
  token: string;
}

export interface Usuario {
  usuarioId: number;
  userName: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

export interface IAuthLoginResponse {
  usuario: Usuario; // 👈 Cambiado
  token: string;
}
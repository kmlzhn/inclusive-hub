import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: "ADMIN" | "TEACHER" | "PSYCHOLOGIST" | "DEFECTOLOGIST" | "SPEECH_THERAPIST" | "TUTOR";
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "TEACHER" | "PSYCHOLOGIST" | "DEFECTOLOGIST" | "SPEECH_THERAPIST" | "TUTOR";
  }
}
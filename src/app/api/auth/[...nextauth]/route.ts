import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Моковые пользователи для демонстрации
const users = [
  {
    id: "1",
    name: "Администратор",
    email: "admin@school.ru",
    password: "admin123",
    role: "ADMIN"
  },
  {
    id: "2",
    name: "Учитель",
    email: "teacher@school.ru",
    password: "teacher123",
    role: "TEACHER"
  },
  {
    id: "3",
    name: "Иванова Мария Петровна",
    email: "psychologist@school.ru",
    password: "psych123",
    role: "PSYCHOLOGIST"
  },
  {
    id: "4",
    name: "Петров Алексей Иванович",
    email: "defectologist@school.ru",
    password: "defect123",
    role: "DEFECTOLOGIST"
  },
  {
    id: "5",
    name: "Сидорова Елена Александровна",
    email: "speech@school.ru",
    password: "speech123",
    role: "SPEECH_THERAPIST"
  },
  {
    id: "6",
    name: "Кузнецов Дмитрий Сергеевич",
    email: "tutor@school.ru",
    password: "tutor123",
    role: "TUTOR"
  }
];

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Необходимо указать email и пароль");
        }

        const user = users.find(user => user.email === credentials.email);

        if (!user) {
          throw new Error("Пользователь не найден");
        }

        const isPasswordValid = user.password === credentials.password;

        if (!isPasswordValid) {
          throw new Error("Неверный пароль");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as "ADMIN" | "TEACHER" | "PSYCHOLOGIST" | "DEFECTOLOGIST" | "SPEECH_THERAPIST" | "TUTOR";
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 дней
  },
  secret: process.env.NEXTAUTH_SECRET || "your-default-secret-do-not-use-in-production",
});

export { handler as GET, handler as POST };
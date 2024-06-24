import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/app/lib/mongodb";
import UsersModel from "@/app/models/users";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();

        const user = await UsersModel.findOne({
          email: credentials.email,
        }).lean();
        if (!user) {
          throw new Error("No user found with the email");
        }
        const { _id, email, imageUrl, fullname } = user;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Incorrect password");
        }

        return { id: _id.toString(), email, imageUrl, fullname };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error", // Error code passed in query string as ?error=
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      } else {
        // Query the user data from the database if not provided
        await connectToDatabase();
        const dbUser = await UsersModel.findById(token.id).lean();
        token.id = dbUser._id.toString();
        token.email = dbUser.email;
        token.imageUrl = dbUser.imageUrl;
        token.fullname = dbUser.fullname;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.imageUrl = token.imageUrl;
      session.user.fullname = token.fullname;
      return session;
    },
  },
});

export { handler as GET, handler as POST };

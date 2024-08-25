import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import jwt from 'jsonwebtoken';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET,
    NEXT_PUBLIC_ENDPOINT, NEXT_AUTH_SECRET
} = process.env;

axios.defaults.baseURL = NEXT_PUBLIC_ENDPOINT;

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        }),

        GitHubProvider({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET
        }),

        CredentialsProvider({
            async authorize(credentials, req) {
                try {
                    const { username, password } = credentials;
                    const { data } = await axios.post(
                        '/auth/login/',
                        { username, password }
                    );
                    const verified = jwt.verify(
                        data.access,
                        NEXT_AUTH_SECRET
                    );
                    return {
                        ...verified,
                        ...data
                    }
                } catch (error) {
                    console.log("ERROR :: ", error.message)
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, user }) {
            return {
                ...token,
                ...user
            }
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        }
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
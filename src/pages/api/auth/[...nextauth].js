import NextAuth from "next-auth";
import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiClient } from "../../../utils/apiClient";
import md5 from 'md5'

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "Username",
					required: true,
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "Username",
					required: true,
				},
			},
			async authorize(credentials, req) {
				try {
					let result = await apiClient().post('/user/login', {...credentials, password: md5(credentials.password)});
					if (result?.status==200 && result?.data) {
						return {
							username: result.data[0].username
						};
					}
					return null;
				} catch (e) {
					console.log(e)
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 30 * 60, // 30 min
		updateAge: 30 * 60, // 30 min
	},
	jwt: {
		maxAge: 30 * 60, // 30 min
		async encode({ token, secret, maxAge }) {
			return jwt.sign(token, secret);
		},
		async decode({ token, secret }) {
			return jwt.verify(token, secret);
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user, account, profile, isNewUser }) {
			if (account?.provider == "credentials" && user.username) {
				token.username = user.username;
				token.user = user.username;
			}
			// console.log('jwt', token);
			return token;
		},
		async session({ session, user, token }) {
			if (token?.username) {
				session.user.username = token.username;
				session.user.user = token.username;
			}
			// console.log('session', session, token)
			return session;
		},
	},
	pages: {
		signIn: "/auth/login",
		signOut: "/auth/logout",
		error: "/auth/error",
	},
};

export default NextAuth(authOptions);

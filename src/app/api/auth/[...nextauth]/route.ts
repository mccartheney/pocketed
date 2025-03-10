import { PrismaClient } from "@prisma/client";
import NextAuth, { User } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

const handler = NextAuth({
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT!,
            clientSecret: process.env.GITHUB_CLIENTSECRET!,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT!,
            clientSecret: process.env.GOOGLE_CLIENTSECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],

    callbacks: {
        async jwt(

            {token, user, account} : {token : JWT, user : User, account?:any}
        ) {
            if (user) {
                const userExists = await prisma.user.findUnique({
                    where : {email : user.email!}
                })
                
                const authMethod = account.provider
                
                if (!userExists) {
                    await prisma.user.create({
                        data : {
                            name: user.name!,
                            email: user.email!,
                            imgUrl: user.image!,
                            authMethod,
                            theme: "dark",
                            friendOf: { connect: [] },
                            friends: { connect: [] },
                            cards: { connect: [] },
                        }
                    })

                }
            }
            return token;
        },
    },
});

export { handler as GET, handler as POST };

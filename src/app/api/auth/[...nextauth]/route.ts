import { PrismaClient } from "@prisma/client";
import NextAuth, { User, Account } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

const handler = NextAuth({
    // providers (github and google) to login in the app 
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
        // callback to create a user in the database if the user is not in the database
        async jwt(
            {token, user, account} : {token : JWT, user : User, account: Account | null}
        ) {
            // check if the user is in the database
            if (user) {
                const userExists = await prisma.user.findFirst({
                    where : {email : user.email!}
                })
                
                // get the auth method (github or google)
                const authMethod = account?.provider!
                
                // if user not exists, create a user in the database
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

            // disconnect the prisma client and return the token 
            await prisma.$disconnect()
            return token;
        },
    },
});

export { handler as GET, handler as POST };

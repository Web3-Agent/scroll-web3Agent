import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Credentials({
      name: "Web3",
      credentials: {
        address: { label: "Address", type: "text" },
      },
      authorize: async (credentials) => {
        // Add your Web3 authentication logic here
        // Example: Verify the credentials.address with your smart contract
        if (credentials.address) {
          return Promise.resolve(credentials.address);
        }
        return Promise.resolve(null);
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  // Add more custom configurations as needed
};

export default (req, res) => NextAuth(req, res, options);

// Checks if we are on the server or not

export const isServer = () => typeof window === "undefined";

// Renders Clerk's SignIn/SignUp flat inside our own Card instead of its own card.
export const embeddedAppearance = {
  elements: {
    rootBox: "w-full",
    cardBox: "w-full shadow-none border-0 rounded-none",
    card: "shadow-none border-0 p-0 bg-transparent",
    header: "hidden",
    footer: "bg-none bg-transparent",
  },
};

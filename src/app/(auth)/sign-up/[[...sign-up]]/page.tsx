import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#000000",
          },
        }}
        signInUrl="/sign-in"
      />
    </div>
  );
}

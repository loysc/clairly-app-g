import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#000000",
          },
        }}
        signUpUrl="/sign-up"
      />
    </div>
  );
}

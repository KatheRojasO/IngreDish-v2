import { SignedOut, SignInButton } from "@clerk/clerk-react";
// import logo from "../assets/logo.png";

export default function WelcomePageHeader() {
  return (
    <header className="welcome-page-header-container">
      <SignedOut>
        {/* <img src={logo} alt="logo" className="logo" /> */}
        <SignInButton />
      </SignedOut>
    </header>
  );
}
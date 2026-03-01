import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Auth | Puffin Analytics",
  description:"Authenticate into Puffin Analytics",
  keywords: [
    "code architecture",
    "software architecture analysis",
    "technical debt detection",
    "engineering intelligence",
    "codebase health monitoring"
  ],
  openGraph: {
    title: "Architectural Intelligence for Growing Codebases",
    description:
      "Visualize structure. Detect drift. Control complexity.",
    type: "website"
  },
  icons: {
    icon: "/assets/images/logo2.png",
    shortcut: "/assets/images/logo2.png",
    apple: "/assets/images/logo2.png",
  }
}


const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return (
    <div className="text-neutral-200 h-screen flex flex-col justify-center items-center ">
      <div>
        <main>
            {children}
        </main>
      </div>
    </div>
  );
}

export default AuthLayout;
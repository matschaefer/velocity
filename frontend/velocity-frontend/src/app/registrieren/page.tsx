import Container from "@/components/layout/Container";
import Navbar from "@/components/layout/Navbar";
import AuthForm from "@/app/login/AuthForm";

type Props = {
  searchParams: Promise<{ returnUrl?: string }>;
};

export default async function RegisterPage({ searchParams }: Props) {
  const { returnUrl } = await searchParams;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32">
        <Container>
          <AuthForm mode="register" returnUrl={returnUrl} />
        </Container>
      </main>
    </>
  );
}

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-ivory pt-32 pb-24">
      <Container size="narrow" className="text-center">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-6 text-6xl sm:text-7xl">This page has wandered off.</h1>
        <p className="mx-auto mt-6 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/">Return home</ButtonLink>
        </div>
      </Container>
    </section>
  );
}

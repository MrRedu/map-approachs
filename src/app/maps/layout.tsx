import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export default function MapsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">← Back</Link>
          </Button>
        </div>
        <ThemeToggle />
      </header>
      <main className="flex-1 p-2 md:p-4 lg:p-6">{children}</main>
    </div>
  );
}

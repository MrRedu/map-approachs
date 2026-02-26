import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Map Approaches</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Demonstrating different map implementations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Apple Maps</CardTitle>
              <CardDescription>MapKit JS Integration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                Demo of Apple&apos;s MapKit JS
              </p>
              <Button asChild>
                <Link href="/maps/apple">Open Apple Maps</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>MapCN</CardTitle>
              <CardDescription>mapcn Integration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                MapCN integration placeholder
              </p>
              <Button asChild>
                <Link href="/maps/mapcn">Open MapCN</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

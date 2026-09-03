import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 lg:px-8 text-center bg-background">
      <h1 className="font-display text-7xl md:text-9xl font-bold text-white/5 tracking-tighter mb-4">
        404
      </h1>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-widest uppercase mb-6">
        Page Not Found
      </h2>
      <p className="text-muted text-lg max-w-md mb-10">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
        <Button asChild size="lg" variant="secondary" className="border-white/10 hover:bg-white/5">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/booking">Book Appointment</Link>
        </Button>
      </div>
    </div>
  )
}

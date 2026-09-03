import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Manage Appointment | Fadehouse Barbershop',
  description: 'View or cancel your Fadehouse appointment.',
  robots: {
    index: false,
    follow: false
  }
}

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

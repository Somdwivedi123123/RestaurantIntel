import { DashboardNav } from '@/components/dashboard/DashboardNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <div className="md:pl-64">
        <div className="pt-16 md:pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/widgets/AppSidebar";
import Footer from "@/components/ui/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <main className="flex w-screen">
        <AppSidebar />
        <div className="flex-1">
          <div className="flex">
            <SidebarTrigger />
          </div>
          {children}
          <Footer/>
        </div>
      </main>
    </SidebarProvider>
  );
}

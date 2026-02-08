import Navbar from "@/components/layout/Navbar";
import { navLinks } from "@/components/data/navLinks";
const TenantDashboard = () => {
  return (
    <div>
      <Navbar navLinks={navLinks.tenant} />
      
    </div>
  )
}

export default TenantDashboard 
import AccountInfo from "@/components/pages/customer/profile/account-info";
import ChangePassword from "@/components/pages/customer/profile/change-password";

export default function CustomerProfilePage() {
  return (
    <div className="space-y-6">
      <AccountInfo />
      <ChangePassword />
    </div>
  );
}

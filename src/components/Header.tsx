import Link from 'next/link';
import UserMenu from './UserMenu';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
export default async function Header() {
  const session = await getServerSession(authOptions);

  const isLoggedIn = !!session;
  const userName = session?.user?.name || "Người dùng";
  const userEmail = session?.user?.email || "";
  const userImage = session?.user?.image || "/default-avatar.png";

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          DormSpace
        </Link>

        <UserMenu isLoggedIn={isLoggedIn} 
        userName={userName} 
        userEmail={userEmail} 
        userImage={userImage} />
      </div>
    </header>
  );
}
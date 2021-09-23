import Search from "@/components/common/Search";
import Logotype from "@/components/ui/Logotype"
import { ChangeEvent, useState } from "react";
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: session } = useSession();

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    return (
      <div className="container mx-auto ">
        <div className="flex gap-x-8 py-6 items-center">
          <Link href="/" passHref>
            <a title="Back to homepage"><Logotype /></a>
          </Link>
          <div className="flex-1">
            <Search
              value={searchQuery}
              placeholder="Search among 100,000+ music tracks"
              onChange={handleOnChange}
            />
          </div>
          <div>
            {session ? (
              <button onClick={() => signOut()}>Sign out</button>
            ) : (
              <button onClick={() => signIn('spotify', { callbackUrl: 'http://localhost:3000' })}>Sign in</button>
            )}
          </div>
        </div>
      </div>
    );
}

export default Header;
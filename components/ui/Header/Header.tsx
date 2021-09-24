
import { ChangeEvent, useCallback, useState } from "react";
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import Search from '@/components/common/Search';
import Logotype from '@/components/ui/Logotype';
import MenuButton from "@/components/ui/MenuButton";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: session } = useSession();

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    const handleOnMenuClick = useCallback(() => {
      console.log('handleOnMenuClick', session);
      if ( !session ) {
        signIn('spotify')
      } else {
        signOut()
      }
    }, [session])

    return (
      <div className="container mx-auto ">
        <div className="flex gap-x-8 py-6 items-center">
          <Link href="/" passHref>
            <a title="Back to homepage">
              <Logotype />
            </a>
          </Link>
          <div className="flex-1">
            <Search
              value={searchQuery}
              placeholder="Search among 100,000+ music tracks"
              onChange={handleOnChange}
            />
          </div>
          <div className="bg-black h-14 w-14 flex items-center justify-center">
            <MenuButton onClick={handleOnMenuClick} />
          </div>
        </div>
      </div>
    );
}

export default Header;
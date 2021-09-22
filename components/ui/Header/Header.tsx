import Search from "@/components/common/Search";
import Logotype from "@/components/ui/Logotype"
import { ChangeEvent, useState } from "react";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    return (
      <div className="container mx-auto ">
        <div className="flex gap-x-8 py-6 items-center">
          <Logotype />
          <div className="flex-1">
            <Search
              value={searchQuery}
              placeholder="Search among 100,000+ music tracks"
              onChange={handleOnChange}
            />
          </div>
        </div>
      </div>
    );
}

export default Header;
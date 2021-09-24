import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';
import Image from 'next/image';
import { GetAllFeaturedPlaylists } from '@/services/spotify/models';
import Section from '@/components/common/Section';
import { SkeletonRectangle } from '@/components/ui/Skeleton';

const fetcher = () => axios.get('/api/browse/featured-playlists');

export const FeaturedPlaylists = () => {
  const { data: res, error } = useSWR<AxiosResponse<GetAllFeaturedPlaylists>>(
    'browse-featured-playlists',
    fetcher
  );

  if (!res && !error) {
    return (
      <Section title="New releases">
        <div className="grid grid-cols-5 gap-1">
          {Array.from(Array(5).keys()).map((index) => (
            <div key={index}>
              <SkeletonRectangle key={index} aspectRatio="4:3" />
            </div>
          ))}
        </div>
      </Section>
    );
  } else if ( !res ) {
    return null;
  }

  return (
    <Section title={res.data.message}>
      <div className="grid grid-cols-5 gap-1">
        {res?.data?.playlists?.items?.map((playlist) => {
          const image = playlist.images[0];
          return (
            <div key={playlist.id} className="bg-white p-5">
              <Image
                src={image.url}
                width={300}
                height={300}
                alt={playlist.name}
              />
              <div className="mt-3 flex flex-col">
                <h3 className="font-bold text-lg leading-6 mb-2">
                  {playlist.name}
                </h3>
                <span className="text-base text-gray-500">
                  {playlist.description} <br />
                </span>
                <span className="text-sm text-gray-500 mt-2">
                  By {playlist.owner.display_name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default FeaturedPlaylists;

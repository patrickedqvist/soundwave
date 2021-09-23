import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';
import Image from 'next/image';
import { GetAllNewReleases } from '@/services/spotify/models';
import Section from '@/components/common/Section';
import { SkeletonRectangle } from '@/components/ui/Skeleton';

const fetcher = () => axios.get('/api/browse/new-releases');

export const NewReleases = () => {
  const { data: res, error } = useSWR<AxiosResponse<GetAllNewReleases>>(
    'browse-new-releases',
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
  }
 

  return (
    <Section title="New releases">
      <div className="grid grid-cols-5 gap-1">
        {res?.data?.albums?.items?.map((album) => {
          const image = album.images[0];
          const artistsNames = album.artists.reduce<string[]>(
            (memo, artist) => {
              memo.push(artist.name);
              return memo;
            },
            []
          );
          return (
            <div key={album.id} className="bg-white p-5">
              <Image
                src={image.url}
                height={image.height}
                width={image.width}
                alt={album.name}
              />
              <div className="mt-3">
                <h3 className="font-bold text-lg leading-6 mb-2">
                  {album.name}
                </h3>
                <span className="text-lg text-gray-500">
                  {artistsNames.join(', ')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default NewReleases;

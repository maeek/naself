'use client';
import { useSearchParams } from 'next/navigation';
import { BigScreenColumn } from '@/components/common/layouts/big-screen-column';
import { Center } from '@/components/common/layouts/center';
import { Spacer } from '@/components/common/spacer';
import { Heading } from '@/components/common/typo/heading';
import { FolderColorPicker } from '@/components/files/folder-color-picker/folder-color-picker';
import { PropertyList } from '@/components/files/list/properties-list';
import { Property } from '@/components/files/list/property';
import { PropertiesTabs } from '@/components/files/tabs/tabs';
import { useGetStatusQuery } from '@/services/api/system.api';

export const DetailsClient = () => {
  const searchParams = useSearchParams();
  const path = searchParams.get('p') || '';
  const { currentData } = useGetStatusQuery(undefined, {
    skip: !path
  });

  return (
    <div className='page page--fullsize'>
      <BigScreenColumn>
        <FolderColorPicker />
        <Spacer size='medium' />
        <Center>
          <Heading
            style={{ padding: '0 1rem' }}
            overflow='ellipsis'
            level={3}
          >
            {path.split('/').pop()}
          </Heading>
        </Center>
        <Spacer size='extra-small' />
        <Center>
          <Heading level={6}>Folder</Heading>
        </Center>
        <Spacer size='medium' />
        <PropertiesTabs
          style={{ padding: '0 1rem' }}
          options={[
            {
              name: 'Properties',
              children: (
                <PropertyList title='Properties'>
                  <Property name='Name'>{path.split('/').pop()}</Property>
                  <Property name='Type'>Folder {currentData?.status}</Property>
                  <Property name='Size'>1.4 TB</Property>
                  <Property name='Path'>{path}</Property>
                  <Property name='Owner'>You</Property>
                  <Property name='Modified'>2023-09-12 16:54:13</Property>
                  <Property name='Created'>2023-09-12 16:54:13</Property>
                </PropertyList>
              )
            },
            {
              name: 'Sharing',
              children: <div />
            }
          ]}
        />
      </BigScreenColumn>
    </div>
  );
};

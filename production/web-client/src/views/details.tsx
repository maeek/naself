import { useLocation } from 'react-router-dom';
import { BigScreenColumn } from '@/components/common/layouts/big-screen-column';
import { Center } from '@/components/common/layouts/center';
import { Spacer } from '@/components/common/spacer';
import { Heading } from '@/components/common/typo/heading';
import { FolderColorPicker } from '@/components/files/folder-color-picker/folder-color-picker';
import { PropertyList } from '@/components/files/list/properties-list';
import { Property } from '@/components/files/list/property';
import { PropertiesTabs } from '@/components/files/tabs/tabs';

export const Details = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const path = searchParams.get('p') || '';

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
                  <Property name='Type'>Folder</Property>
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

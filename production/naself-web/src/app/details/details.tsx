'use client';
import { useMemo } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { BigScreenColumn } from '@/components/common/layouts/big-screen-column';
import { Center } from '@/components/common/layouts/center';
import { Spacer } from '@/components/common/spacer';
import { Heading } from '@/components/common/typo/heading';
import { FolderColorPicker } from '@/components/files/folder-color-picker/folder-color-picker';
import { PropertyList } from '@/components/files/list/properties-list';
import { Property } from '@/components/files/list/property';
import { PropertiesTabs } from '@/components/files/tabs/tabs';

export const DetailsClient = ({ path }: { path: string }) => {
  const { t } = useTranslation();

  const searchParams = useSearchParams();
  const paramsPath = path || searchParams.get('path') || '';
  const sanitizedPath = useMemo(() => {
    let newPath = paramsPath;
    while (newPath.endsWith('/') && newPath !== '/') {
      newPath = newPath.slice(0, -1);
    }
    return newPath;
  }, [paramsPath]);
  const name = sanitizedPath.split('/').pop();

  if (!name) return redirect('/');

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
            {name}
          </Heading>
        </Center>
        <Spacer size='extra-small' />
        <Center>
          <Heading level={6}>{t('filetype.folder')}</Heading>
        </Center>
        <Spacer size='medium' />
        <PropertiesTabs
          style={{ padding: '0 1rem' }}
          options={[
            {
              name: t('details.properties'),
              children: (
                <PropertyList title='Properties'>
                  <Property name={t('property.name')}>{name}</Property>
                  <Property name={t('property.type')}>{t('filetype.folder')}</Property>
                  <Property name={t('property.size')}>1.4 TB</Property>
                  <Property name={t('property.path')}>{sanitizedPath}</Property>
                  <Property name={t('property.owner')}>You</Property>
                  <Property name={t('property.modified')}>2023-09-12 16:54:13</Property>
                  <Property name={t('property.created')}>2023-09-12 16:54:13</Property>
                </PropertyList>
              )
            },
            {
              name: t('details.sharing'),
              children: <div />
            }
          ]}
        />
      </BigScreenColumn>
    </div>
  );
};

import { IconLinkPlus, IconPlus, IconSearch, IconUserFilled } from '@tabler/icons-react';
import { useGetStatusQuery } from '@/services/api/system.api';
import { Button } from './components/common/button';
import { Fieldset } from './components/common/fieldset';
import { Spacer } from './components/common/spacer';
import { Input } from './components/common/text-input/text-input';
import { Toggle } from './components/common/toggle/toggle';
import { PropertyList } from './components/file-details/list/properties-list';
import { Property } from './components/file-details/list/property';
import { PropertiesTabs } from './components/file-details/tabs/tabs';
import './app.scss';

export const App = () => {
  const { currentData } = useGetStatusQuery();

  return (
    <div style={{ width: '100%', padding: '0.5rem 1rem' }}>
      <PropertiesTabs
        options={[
          {
            name: 'Properties',
            children: (
              <>
                <PropertyList title='Properties'>
                  <Property name='Type'>Folder</Property>
                  <Property name='Size'>1.4 TB</Property>
                  <Property name='Path'>/Movies</Property>
                  <Property name='Owner'>You</Property>
                  <Property name='Modified'>2023-09-12 16:54:13</Property>
                  <Property name='Created'>2023-09-12 16:54:13</Property>
                  <Property name='Status'>{currentData?.status ?? 'Loading...'}</Property>
                </PropertyList>
                <Spacer size='medium' />
                {(['small', 'medium', 'large'] as const).map(size => (
                  <>
                    <div
                      key={size}
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        alignItems: 'flex-start',
                        marginTop: '1rem'
                      }}
                    >
                      <Input
                        placeholder='Type something...'
                        type='search'
                        prefix={<IconSearch />}
                      />
                      <Button
                        prefix={<IconLinkPlus />}
                        size={size}
                      >
                        Share
                      </Button>
                      <Button
                        prefix={<IconLinkPlus />}
                        size={size}
                        disabled
                      >
                        Share
                      </Button>
                      <Button
                        size={size}
                        variant='secondary'
                        prefix={<IconPlus />}
                      >
                        Add to bookmarks
                      </Button>
                      <Button
                        size={size}
                        variant='outline'
                      >
                        test
                      </Button>
                      <Button
                        size={size}
                        variant='success'
                      >
                        Download
                      </Button>
                      <Button
                        size={size}
                        variant='info'
                      >
                        Copy
                      </Button>
                      <Button
                        size={size}
                        variant='warning'
                      >
                        Copy
                      </Button>
                      <Button
                        size={size}
                        variant='danger'
                      >
                        Delete
                      </Button>
                    </div>
                    <Spacer size='large' />
                  </>
                ))}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    marginTop: '1rem'
                  }}
                >
                  <Toggle prefix='Select me' />
                  <Toggle
                    checked
                    disabled
                  />
                  <Toggle disabled />
                </div>
                <Spacer size='large' />
                <Input
                  placeholder='Type something...'
                  prefix={<IconUserFilled />}
                  type='password'
                  validate={value => value.length < 1 && 'Too short'}
                  value='hasłoo'
                  suffix={<div style={{ padding: '0 0.5rem', color: 'var(--clr-secondary-text)' }}>Clear</div>}
                />
                <Spacer size='large' />
              </>
            )
          },
          {
            name: 'Sharing',
            children: (
              <PropertyList title='Sharing'>
                <Property name='Shared with'>3 people</Property>
                <Property name='Shared by'>You</Property>
                <Fieldset
                  title='Share with'
                  description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam ac tincidunt ultricies, nisl nunc aliquam nunc, vitae ultrices nisl nunc quis nunc.'
                >
                  <Input placeholder='Type something...' />
                </Fieldset>
                <Fieldset
                  title='Sharing'
                  description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam ac tincidunt ultricies, nisl nunc aliquam nunc, vitae ultrices nisl nunc quis nunc.'
                  layout='horizontal'
                  htmlFor='sharing-toggle'
                >
                  <Toggle id='sharing-toggle' />
                </Fieldset>
              </PropertyList>
            )
          }
        ]}
      />
    </div>
  );
};

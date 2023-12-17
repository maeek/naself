/* eslint-disable no-console */
'use client';

import { IconLinkPlus, IconPlus, IconSearch, IconUserFilled } from '@tabler/icons-react';
import 'focus-visible';
import { Button, SplitButton } from '@/components/common/button';
import { Fieldset } from '@/components/common/fieldset';
import { Radio } from '@/components/common/radio';
import { Select } from '@/components/common/select';
import { Spacer } from '@/components/common/spacer';
import { Input } from '@/components/common/text-input/text-input';
import { Toggle } from '@/components/common/toggle/toggle';
import { PropertyList } from '@/components/files/list/properties-list';
import { Property } from '@/components/files/list/property';
import { PropertiesTabs } from '@/components/files/tabs/tabs';

export const ComponentsPreview = () => {
  return (
    <div style={{ width: '100%', padding: '0.5rem 1rem' }}>
      <Select
        options={[
          { value: 'aaa', label: 'eee', group: 'main' },
          { value: 'jeden', label: 'aa', group: 'main' },
          { value: 'dwa', label: 'dwa', group: 'other' },
          { value: 'trzy', label: 'yeee', group: 'other', disabled: true }
        ]}
      />
      <Spacer size='medium' />
      <PropertiesTabs
        options={[
          {
            name: 'Properties',
            children: (
              <div key='properties'>
                <PropertyList title='Properties'>
                  <Property
                    key='p-Type'
                    name='Type'
                  >
                    Folder
                  </Property>
                  <Property
                    key='p-Size'
                    name='Size'
                  >
                    1.4 TB
                  </Property>
                  <Property
                    key='p-Path'
                    name='Path'
                  >
                    /Movies
                  </Property>
                  <Property
                    key='p-Owner'
                    name='Owner'
                  >
                    You
                  </Property>
                  <Property
                    key='p-Modified'
                    name='Modified'
                  >
                    2023-09-12 16:54:13
                  </Property>
                  <Property
                    key='p-Created'
                    name='Created'
                  >
                    2023-09-12 16:54:13
                  </Property>
                  <Property
                    key='p-Status'
                    name='Status'
                  >
                    Loading...
                  </Property>
                </PropertyList>
                <Spacer size='medium' />
                {(['small', 'medium', 'large'] as const).map(size => (
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
                  <Toggle
                    prefix='Select me'
                    onChange={e => {
                      if (e.target.checked) {
                        document.querySelector('html')!.classList.remove('dark');
                        document.querySelector('html')!.classList.add('light');
                      } else {
                        document.querySelector('html')!.classList.remove('light');
                        document.querySelector('html')!.classList.add('dark');
                      }
                    }}
                  />
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
                  value=''
                  suffix={<div style={{ padding: '0 0.5rem', color: 'var(--th-clr-secondary-text)' }}>Clear</div>}
                />
                <Input
                  placeholder='Type something...'
                  type='text'
                  value=''
                  disabled
                />
                <Spacer size='large' />
              </div>
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
                  onChange={e => console.log(e.target.name, e.target.value, e.target.checked)}
                  layout='horizontal'
                  name='custom'
                >
                  <Toggle value='aa' />
                  <Spacer size='extra-small' />
                  <Toggle value='bb' />
                </Fieldset>
                <Fieldset
                  title='Sharing'
                  description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam ac tincidunt ultricies, nisl nunc aliquam nunc, vitae ultrices nisl nunc quis nunc.'
                  onChange={e => console.log(e.target.name, e.target.value, e.target.checked)}
                  layout='horizontal'
                  name='custom'
                  box
                >
                  <Toggle value='aa' />
                </Fieldset>
                <Fieldset
                  onChange={e => console.log(e.target.value)}
                  name='sharing'
                  box
                >
                  <Radio
                    value='public'
                    label='Public'
                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam ac tincidunt ultricies, nisl nunc aliquam nunc, vitae ultrices nisl nunc quis nunc.'
                  />
                  <Spacer size='medium' />
                  <Radio
                    value='internal'
                    label='Internal'
                  />
                  <Spacer size='medium' />
                  <Radio
                    value='public'
                    label='Private'
                  />
                  <Spacer size='medium' />
                  <Radio
                    value='custom'
                    label='Custom'
                    disabled
                  />
                </Fieldset>
                <Fieldset
                  onChange={e => console.log(e.target.value)}
                  name='sharing2'
                  title='Sharing'
                  description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam ac tincidunt ultricies, nisl nunc aliquam nunc, vitae ultrices nisl nunc quis nunc.'
                  box
                >
                  <Radio
                    value='public'
                    label='Public'
                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam ac tincidunt ultricies, nisl nunc aliquam nunc, vitae ultrices nisl nunc quis nunc.'
                  />
                  <Spacer size='medium' />
                  <Radio
                    value='internal'
                    label='Internal'
                  />
                  <Spacer size='medium' />
                  <Radio
                    value='public'
                    label='Private'
                  />
                  <Spacer size='medium' />
                  <Radio
                    value='custom'
                    label='Custom'
                    disabled
                  />
                </Fieldset>
                <Spacer size='medium' />
                {(['primary', 'secondary', 'success', 'info', 'warning', 'danger'] as const).map(v => (
                  <div
                    key={`split-${v}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '0.8rem'
                    }}
                  >
                    <SplitButton
                      variant={v}
                      size='large'
                      options={[
                        { name: 'Merge request' },
                        {
                          name: 'Squash and merge',
                          description:
                            'Lorem Ipsum Sil dolor amet, ipsum tepsum tipitty. Lorem Ipsum Sil dolor amet, ipsum tepsum tipitty Lorem Ipsum Sil dolor amet, ipsum tepsum tipitty'
                        },
                        { name: 'Rebase and merge', disabled: true }
                      ]}
                    />

                    <SplitButton
                      variant={v}
                      size='medium'
                      options={[
                        { name: 'Merge request' },
                        {
                          name: 'Squash and merge',
                          description:
                            'Lorem Ipsum Sil dolor amet, ipsum tepsum tipitty. Lorem Ipsum Sil dolor amet, ipsum tepsum tipitty Lorem Ipsum Sil dolor amet, ipsum tepsum tipitty'
                        },
                        { name: 'Rebase and merge' }
                      ]}
                    />

                    <SplitButton
                      optionsPosition='left'
                      variant={v}
                      size='small'
                      options={[
                        { name: 'Merge request' },
                        {
                          name: 'Squash and merge',
                          description:
                            'Lorem Ipsum Sil dolor amet, ipsum tepsum tipitty. Lorem Ipsum Sil dolor amet, ipsum tepsum tipitty Lorem Ipsum Sil dolor amet, ipsum tepsum tipitty'
                        },
                        { name: 'Rebase and merge' }
                      ]}
                    />
                  </div>
                ))}
              </PropertyList>
            )
          }
        ]}
      />
    </div>
  );
};
